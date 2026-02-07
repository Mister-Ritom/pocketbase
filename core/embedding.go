package core

import (
	"bytes"
	_ "embed"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"math"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strings"
	"time"
)

//go:embed assets/clip_runner
var clipRunnerBinary []byte

// StartCLIPService starts the embedded Python CLIP service
func StartCLIPService() error {
    log.Println("[CLIP] Starting embedded CLIP service...")

    tempDir := os.TempDir()
    
    // 1. Handle Windows .exe extension
    binaryName := "clip_runner"
    tempPath := filepath.Join(tempDir, binaryName)
    
    log.Printf("[CLIP] Extracting binary to: %s", tempPath)

    if err := os.WriteFile(tempPath, clipRunnerBinary, 0755); err != nil {
        return fmt.Errorf("failed to write embedded binary: %w", err)
    }

    // On macOS, we need to ad-hoc sign the binary after extraction
    if runtime.GOOS == "darwin" {
        log.Println("[CLIP] Applying ad-hoc signature to binary...")
        signCmd := exec.Command("codesign", "-s", "-", "--force", tempPath)
        if out, err := signCmd.CombinedOutput(); err != nil {
            log.Printf("[CLIP] Warning: Failed to sign binary: %v (output: %s)", err, out)
        }
    }

    // 2. Setup PyInstaller Temp (Use TMPDIR/TEMP/TMP to cover all bases)
    extractDir := filepath.Join(tempDir, "clip_pyinstaller")
    os.MkdirAll(extractDir, 0755)

    log.Println("[CLIP] Starting CLIP process...")
    cmd := exec.Command(tempPath)
    
    // Pass only essential env vars + PORT
    cmd.Env = append(os.Environ(),
        "PYTHONUNBUFFERED=1",
        "PORT=8001", 
    )
    
    cmd.Stdout = os.Stdout
    cmd.Stderr = os.Stderr

    if err := cmd.Start(); err != nil {
        return fmt.Errorf("failed to start CLIP service: %w", err)
    }

    log.Printf("[CLIP] CLIP process started with PID: %d", cmd.Process.Pid)

    // 4. Create a channel to signal if the process dies unexpectedly
    processExit := make(chan error, 1)
    go func() {
        err := cmd.Wait()
        processExit <- err // Send the error (or nil) to the channel
        close(processExit)
    }()

    if globalCLIPService == nil {
        globalCLIPService = &LocalCLIPService{
            baseURL: "http://127.0.0.1:8001", // 5. Use 127.0.0.1 to avoid IPv6 issues
            client: &http.Client{
                Timeout: 30 * time.Second,
            },
        }
    }
    globalCLIPService.process = cmd

    // Test service availability
    log.Println("[CLIP] Testing service availability...")
    maxRetries := 60 
    ticker := time.NewTicker(1 * time.Second)
    defer ticker.Stop()

    for i := 0; i < maxRetries; i++ {
        select {
        case err := <-processExit:
            // 6. Fail immediately if process dies
            return fmt.Errorf("CLIP process exited prematurely: %v", err)
        case <-ticker.C:
            if i%5 == 0 {
                log.Printf("[CLIP] Checking readiness (%d/%d)...", i+1, maxRetries)
            }
            
            // Use 127.0.0.1 here explicitly
            resp, err := globalCLIPService.client.Get("http://127.0.0.1:8001/health")
            if err == nil && resp.StatusCode == 200 {
                resp.Body.Close()
                log.Println("[CLIP] Service is ready and responding!")
                return nil
            }
            if resp != nil {
                resp.Body.Close()
            }
        }
    }

    // Cleanup if timeout
    if cmd.Process != nil {
        cmd.Process.Kill()
    }
    return fmt.Errorf("CLIP service failed to start within 60 seconds")
}

// StopCLIPService stops the CLIP service
func StopCLIPService() {
	if globalCLIPService != nil && globalCLIPService.process != nil {
		log.Println("[CLIP] Stopping CLIP service...")
		globalCLIPService.process.Process.Kill()
		globalCLIPService.process = nil
	}
}

// Global CLIP service instance - shared across all embedding operations
var globalCLIPService *LocalCLIPService

// EmbeddingProvider defines the interface for generating embeddings
type EmbeddingProvider interface {
	EmbedText(text string) ([]float32, error)
	EmbedImage(imagePath string) ([]float32, error)
	EmbedVideo(videoPath string) ([]float32, error)
	GenerateEmbedding(content string, contentType string) []float32
	Dimensions() int
}

// LocalCLIPService provides CLIP embeddings via REST API
type LocalCLIPService struct {
	baseURL  string
	client   *http.Client
	process  *exec.Cmd
	isRunning bool
}

// NewLocalCLIPService creates a new REST API CLIP service
func NewLocalCLIPService() *LocalCLIPService {
	// If global service is available, use it instead of creating a new one
	if globalCLIPService != nil {
		return globalCLIPService
	}

	// Fallback for when global service is not initialized (testing, etc.)
	return &LocalCLIPService{
		baseURL: "http://localhost:8001",
		client: &http.Client{
			Timeout: 30 * time.Second,
		},
	}
}

// StopProcess stops the Python process
func (c *LocalCLIPService) StopProcess() error {
	if !c.isRunning {
		return nil
	}

	if c.process != nil {
		if err := c.process.Process.Kill(); err != nil {
			log.Printf("Error killing process: %v", err)
		}
	}

	c.isRunning = false
	return nil
}

// GenerateEmbedding communicates with the Python CLIP service via REST API
func (c *LocalCLIPService) GenerateEmbedding(base64Data string) ([]float32, error) {
	log.Printf("[CLIP] GenerateEmbedding called with data length: %d", len(base64Data))

	// Remove data URL prefix if present
	if strings.Contains(base64Data, "base64,") {
		parts := strings.Split(base64Data, "base64,")
		if len(parts) > 1 {
			base64Data = parts[1]
		}
	}

	// Prepare request payload
	request := struct {
		Image string `json:"image"`
	}{
		Image: base64Data,
	}

	// Marshal request to JSON
	jsonData, err := json.Marshal(request)
	if err != nil {
		log.Printf("[CLIP] Failed to marshal request: %v", err)
		return nil, fmt.Errorf("failed to marshal request: %w", err)
	}

	log.Printf("[CLIP] Sending POST request to %s/embed", c.baseURL)

	// Create HTTP request
	req, err := http.NewRequest("POST", c.baseURL+"/embed", bytes.NewBuffer(jsonData))
	if err != nil {
		log.Printf("[CLIP] Failed to create HTTP request: %v", err)
		return nil, fmt.Errorf("failed to create HTTP request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")

	// Send request
	resp, err := c.client.Do(req)
	if err != nil {
		log.Printf("[CLIP] HTTP request failed: %v", err)
		return nil, fmt.Errorf("HTTP request failed: %w", err)
	}
	defer resp.Body.Close()

	log.Printf("[CLIP] Received response with status: %s", resp.Status)

	// Read response body
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Printf("[CLIP] Failed to read response body: %v", err)
		return nil, fmt.Errorf("failed to read response body: %w", err)
	}

	log.Printf("[CLIP] Response body length: %d bytes", len(body))
	log.Printf("[CLIP] Response preview: %s", string(body[:min(200, len(body))]))

	// Check HTTP status
	if resp.StatusCode != http.StatusOK {
		log.Printf("[CLIP] HTTP error status: %d, body: %s", resp.StatusCode, string(body))
		return nil, fmt.Errorf("HTTP error %d: %s", resp.StatusCode, string(body))
	}

	// Parse response
	var response struct {
		Embedding []float32 `json:"embedding"`
		Error     string    `json:"error,omitempty"`
	}

	if err := json.Unmarshal(body, &response); err != nil {
		log.Printf("[CLIP] Failed to unmarshal response: %v", err)
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	if response.Error != "" {
		log.Printf("[CLIP] CLIP service returned error: %s", response.Error)
		return nil, fmt.Errorf("CLIP service error: %s", response.Error)
	}

	if len(response.Embedding) == 0 {
		log.Printf("[CLIP] CLIP service returned empty embedding")
		return nil, fmt.Errorf("CLIP service returned empty embedding")
	}

	log.Printf("[CLIP] Successfully generated embedding with %d dimensions", len(response.Embedding))
	return response.Embedding, nil
}

// RealImageEmbedder provides CLIP embeddings ONLY - no fallbacks
type RealImageEmbedder struct {
	clipService *LocalCLIPService
	dimensions  int
}

// NewRealImageEmbedder creates a new CLIP-based image embedder (CLIP ONLY)
func NewRealImageEmbedder(dimensions int) *RealImageEmbedder {
	return &RealImageEmbedder{
		clipService: NewLocalCLIPService(),
		dimensions:  dimensions,
	}
}

// EmbedText CRASHES - this embedder is ONLY for CLIP images
func (e *RealImageEmbedder) EmbedText(text string) ([]float32, error) {
	log.Fatalf("[CLIP] CRITICAL: RealImageEmbedder does not support text - only CLIP images")
	return nil, nil // This will never be reached
}

// EmbedImageFromBase64 generates CLIP embeddings ONLY - CRASHES if CLIP unavailable
func (e *RealImageEmbedder) EmbedImageFromBase64(base64Data string) ([]float32, error) {
	log.Printf("[CLIP] EmbedImageFromBase64 called with data length: %d", len(base64Data))

	// ONLY use CLIP service - CRASH if unavailable (no fallbacks)
	clipEmbedding, err := e.clipService.GenerateEmbedding(base64Data)
	if err != nil {
		log.Fatalf("[CLIP] CRITICAL: CLIP service failed: %v", err)
	}

	log.Printf("[CLIP] Successfully generated CLIP embedding with %d dimensions", len(clipEmbedding))

	// Normalize to our target dimensions
	if len(clipEmbedding) != e.dimensions {
		// Truncate or pad as needed
		if len(clipEmbedding) > e.dimensions {
			clipEmbedding = clipEmbedding[:e.dimensions]
		} else {
			// Pad with zeros
			padded := make([]float32, e.dimensions)
			copy(padded, clipEmbedding)
			clipEmbedding = padded
		}
	}

	return normalizeVector(clipEmbedding), nil
}

// EmbedImage generates CLIP embeddings from file path
func (e *RealImageEmbedder) EmbedImage(imagePath string) ([]float32, error) {
	// Read the image file and convert to base64 for CLIP processing
	imageData, err := os.ReadFile(imagePath)
	if err != nil {
		log.Fatalf("[CLIP] CRITICAL: Failed to read image file: %v", err)
	}

	// Convert to base64
	base64Data := fmt.Sprintf("data:image/jpeg;base64,%s", string(imageData))

	// Use CLIP service for embedding generation
	return e.EmbedImageFromBase64(base64Data)
}

// EmbedVideo CRASHES - this embedder is ONLY for CLIP images
func (e *RealImageEmbedder) EmbedVideo(videoPath string) ([]float32, error) {
	log.Fatalf("[CLIP] CRITICAL: RealImageEmbedder does not support videos - only CLIP images")
	return nil, nil // This will never be reached
}

// Dimensions returns the embedding dimensions
func (e *RealImageEmbedder) Dimensions() int {
	return e.dimensions
}

// GenerateEmbedding ONLY uses CLIP for images - CRASHES if CLIP fails or wrong content type
func (e *RealImageEmbedder) GenerateEmbedding(content string, contentType string) []float32 {
	// For image content type, MUST use CLIP - no fallbacks allowed
	if contentType == "image" {
		// Check if content looks like base64 (no spaces, reasonable length)
		if len(content) > 100 && !strings.Contains(content, " ") {
			// MUST use CLIP - no fallbacks
			embedding, err := e.EmbedImageFromBase64(content)
			if err != nil {
				log.Fatalf("[CLIP] CRITICAL: CLIP service failed for image embedding: %v", err)
			}
			log.Printf("[CLIP] Successfully generated CLIP embedding for image")
			return embedding
		} else {
			log.Fatalf("[CLIP] CRITICAL: Image content does not appear to be base64 data")
		}
	}

	// For non-image content, crash - this embedder is ONLY for CLIP images
	log.Fatalf("[CLIP] CRITICAL: RealImageEmbedder only supports image content via CLIP")
	return nil // This will never be reached
}

// FileEmbedder provides basic file embeddings based on content analysis
type FileEmbedder struct {
	dimensions int
}

// NewFileEmbedder creates a new file embedder
func NewFileEmbedder(dimensions int) *FileEmbedder {
	return &FileEmbedder{dimensions: dimensions}
}

// GenerateEmbedding generates an embedding for file content
func (e *FileEmbedder) GenerateEmbedding(content string, contentType string) []float32 {
	log.Fatalf("[CLIP] CRITICAL: FileEmbedder not supported - use CLIP for images only")
	return nil // This will never be reached
}

// Dimensions returns the embedding dimensions
func (e *FileEmbedder) Dimensions() int {
	return e.dimensions
}

// EmbedText not supported
func (e *FileEmbedder) EmbedText(text string) ([]float32, error) {
	log.Fatalf("[CLIP] CRITICAL: FileEmbedder does not support text")
	return nil, nil // This will never be reached
}

// EmbedImage not supported
func (e *FileEmbedder) EmbedImage(imagePath string) ([]float32, error) {
	log.Fatalf("[CLIP] CRITICAL: FileEmbedder does not support images")
	return nil, nil // This will never be reached
}

// EmbedVideo not supported
func (e *FileEmbedder) EmbedVideo(videoPath string) ([]float32, error) {
	log.Fatalf("[CLIP] CRITICAL: FileEmbedder does not support videos")
	return nil, nil // This will never be reached
}

// EmbeddingManager manages different embedding providers
type EmbeddingManager struct {
	providers map[string]EmbeddingProvider
	defaultProvider EmbeddingProvider
}

// NewEmbeddingManager creates a new embedding manager
func NewEmbeddingManager() *EmbeddingManager {
	manager := &EmbeddingManager{
		providers: make(map[string]EmbeddingProvider),
	}

	// Only CLIP image embedder - no fallbacks
	imageEmbedder := NewRealImageEmbedder(384)
	fileEmbedder := NewFileEmbedder(384)

	manager.providers["image"] = imageEmbedder
	manager.providers["file"] = fileEmbedder

	manager.defaultProvider = imageEmbedder

	return manager
}

// GenerateEmbedding generates an embedding for the given content and type
func (em *EmbeddingManager) GenerateEmbedding(content string, contentType string) []float32 {
	provider := em.getProvider(contentType)
	return provider.GenerateEmbedding(content, contentType)
}

// getProvider returns the appropriate provider for the content type
func (em *EmbeddingManager) getProvider(contentType string) EmbeddingProvider {
	if provider, exists := em.providers[contentType]; exists {
		return provider
	}
	return em.defaultProvider
}

// GetDimensions returns the dimensions for a content type
func (em *EmbeddingManager) GetDimensions(contentType string) int {
	provider := em.getProvider(contentType)
	return provider.Dimensions()
}

// EmbedText CRASHES - only CLIP images supported
func (em *EmbeddingManager) EmbedText(text string) ([]float32, error) {
	log.Fatalf("[CLIP] CRITICAL: Only CLIP image embeddings supported")
	return nil, nil // This will never be reached
}

// EmbedImage generates CLIP image embeddings
func (em *EmbeddingManager) EmbedImage(imagePath string) ([]float32, error) {
	provider := em.getProvider("image")
	return provider.EmbedImage(imagePath)
}

// EmbedVideo CRASHES - only CLIP images supported
func (em *EmbeddingManager) EmbedVideo(videoPath string) ([]float32, error) {
	log.Fatalf("[CLIP] CRITICAL: Only CLIP image embeddings supported")
	return nil, nil // This will never be reached
}

// EmbedImageFromBase64 generates CLIP image embeddings from base64
func (em *EmbeddingManager) EmbedImageFromBase64(base64Data string) ([]float32, error) {
	provider := em.getProvider("image")
	if imageEmbedder, ok := provider.(*RealImageEmbedder); ok {
		return imageEmbedder.EmbedImageFromBase64(base64Data)
	}
	log.Fatalf("[CLIP] CRITICAL: Only CLIP image embeddings supported")
	return nil, nil // This will never be reached
}

// min returns the minimum of two integers
func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

// normalizeVector applies L2 normalization
func normalizeVector(vec []float32) []float32 {
	var norm float32
	for _, v := range vec {
		norm += v * v
	}
	norm = float32(math.Sqrt(float64(norm)))

	if norm == 0 {
		return vec
	}

	for i := range vec {
		vec[i] /= norm
	}
	return vec
}
