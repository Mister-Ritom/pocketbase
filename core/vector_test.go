package core

import (
	"os"
	"path/filepath"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestNewVectorIndex(t *testing.T) {
	tempDir := t.TempDir()
	vi := NewVectorIndex(tempDir)

	assert.NotNil(t, vi)
	assert.Equal(t, tempDir, vi.dataDir)
	assert.NotNil(t, vi.vectors)
}

func TestVectorIndex_Insert(t *testing.T) {
	tempDir := t.TempDir()
	vi := NewVectorIndex(tempDir)

	record := &VectorRecord{
		ID:        "test1",
		Type:      "text",
		Embedding: []float32{0.1, 0.2, 0.3},
		Metadata:  map[string]interface{}{"tags": []string{"test"}},
	}

	err := vi.Insert(record)
	assert.NoError(t, err)

	// Check if saved to disk
	filePath := filepath.Join(tempDir, "vectors", "vectors.json")
	_, err = os.Stat(filePath)
	assert.NoError(t, err)
}

func TestVectorIndex_Get(t *testing.T) {
	tempDir := t.TempDir()
	vi := NewVectorIndex(tempDir)

	record := &VectorRecord{
		ID:        "test1",
		Type:      "text",
		Embedding: []float32{0.1, 0.2, 0.3},
		Metadata:  map[string]interface{}{"tags": []string{"test"}},
	}

	err := vi.Insert(record)
	assert.NoError(t, err)

	retrieved, exists := vi.Get("test1")
	assert.True(t, exists)
	assert.Equal(t, "test1", retrieved.ID)
	assert.Equal(t, "text", retrieved.Type)
	assert.Equal(t, []float32{0.1, 0.2, 0.3}, retrieved.Embedding)
}

func TestVectorIndex_Load(t *testing.T) {
	tempDir := t.TempDir()
	vi := NewVectorIndex(tempDir)

	record := &VectorRecord{
		ID:        "test1",
		Type:      "text",
		Embedding: []float32{0.1, 0.2, 0.3},
		Metadata:  map[string]interface{}{"tags": []string{"test"}},
		CreatedAt: time.Now(),
	}

	err := vi.Insert(record)
	assert.NoError(t, err)

	// Create new index and load
	vi2 := NewVectorIndex(tempDir)
	err = vi2.Load()
	assert.NoError(t, err)

	retrieved, exists := vi2.Get("test1")
	assert.True(t, exists)
	assert.Equal(t, "test1", retrieved.ID)
}

func TestVectorIndex_Search(t *testing.T) {
	tempDir := t.TempDir()
	vi := NewVectorIndex(tempDir)

	// Add test vectors
	vectors := []*VectorRecord{
		{
			ID:        "vec1",
			Type:      "text",
			Embedding: []float32{0.1, 0.2, 0.3},
			Metadata:  map[string]interface{}{"tags": []string{"flutter"}},
		},
		{
			ID:        "vec2",
			Type:      "text",
			Embedding: []float32{0.15, 0.25, 0.35},
			Metadata:  map[string]interface{}{"tags": []string{"dart"}},
		},
		{
			ID:        "vec3",
			Type:      "image",
			Embedding: []float32{0.5, 0.6, 0.7},
			Metadata:  map[string]interface{}{"tags": []string{"photo"}},
		},
	}

	err := vi.Upsert(vectors)
	assert.NoError(t, err)

	// Search for similar vectors (empty type means search all types)
	results := vi.Search([]float32{0.1, 0.2, 0.3}, 5, "", nil)
	assert.Len(t, results, 3) // Should return all vectors when no type filter
	assert.Equal(t, "vec1", results[0].ID) // Most similar
	assert.Equal(t, "vec2", results[1].ID) // Second most similar
	assert.Equal(t, "vec3", results[2].ID) // Third most similar

	// Test type filtering
	textResults := vi.Search([]float32{0.1, 0.2, 0.3}, 5, "text", nil)
	assert.Len(t, textResults, 2) // Should return only text type vectors
	assert.Equal(t, "vec1", textResults[0].ID)
	assert.Equal(t, "vec2", textResults[1].ID)
}

func TestVectorIndex_Delete(t *testing.T) {
	tempDir := t.TempDir()
	vi := NewVectorIndex(tempDir)

	record := &VectorRecord{
		ID:        "test1",
		Type:      "text",
		Embedding: []float32{0.1, 0.2, 0.3},
		Metadata:  map[string]interface{}{"tags": []string{"test"}},
	}

	err := vi.Insert(record)
	assert.NoError(t, err)

	_, exists := vi.Get("test1")
	assert.True(t, exists)

	err = vi.Delete("test1")
	assert.NoError(t, err)

	_, exists = vi.Get("test1")
	assert.False(t, exists)
}

func TestCosineSimilarity(t *testing.T) {
	a := []float32{1, 0}
	b := []float32{1, 0}
	sim := cosineSimilarity(a, b)
	assert.Equal(t, float32(1.0), sim)

	a = []float32{1, 0}
	b = []float32{0, 1}
	sim = cosineSimilarity(a, b)
	assert.Equal(t, float32(0.0), sim)

	a = []float32{1, 1}
	b = []float32{1, 1}
	sim = cosineSimilarity(a, b)
	assert.Equal(t, float32(1.0), sim)
}

func TestMatchesFilters(t *testing.T) {
	metadata := map[string]interface{}{
		"tags": []string{"test", "example"},
		"type": "text",
	}

	assert.True(t, matchesFilters(metadata, map[string]interface{}{"type": "text"}))
	assert.False(t, matchesFilters(metadata, map[string]interface{}{"type": "image"}))
	assert.True(t, matchesFilters(metadata, map[string]interface{}{}))
}

// TestEmbeddingDeterminism tests that the same content produces identical embeddings
func TestEmbeddingDeterminism(t *testing.T) {
	// Test with the image.png file - try multiple possible locations
	var imagePath string
	possiblePaths := []string{
		"image.png",           // current directory
		"../image.png",        // parent directory
		"../../image.png",     // grandparent
		"/Users/ritom/Projects/pocketbase/image.png", // absolute path
	}

	for _, path := range possiblePaths {
		if _, err := os.Stat(path); err == nil {
			imagePath = path
			break
		}
	}

	if imagePath == "" {
		t.Skip("image.png not found in any expected location, skipping determinism test")
		return
	}

	t.Logf("Using image file: %s", imagePath)

	embedder := NewRealImageEmbedder(384)

	// Generate embedding multiple times
	var embeddings [][]float32
	for i := 0; i < 5; i++ {
		embedding, err := embedder.EmbedImage(imagePath)
		assert.NoError(t, err)
		assert.NotNil(t, embedding)
		assert.Len(t, embedding, 384)
		embeddings = append(embeddings, embedding)
	}

	// All embeddings should be identical
	for i := 1; i < len(embeddings); i++ {
		if !assert.Equal(t, embeddings[0], embeddings[i],
			"Embedding %d should be identical to the first embedding", i) {
			// Debug: show differences
			t.Logf("First embedding (first 10): %v", embeddings[0][:10])
			t.Logf("Embedding %d (first 10): %v", i, embeddings[i][:10])

			// Find first difference
			for j := 0; j < len(embeddings[0]); j++ {
				if embeddings[0][j] != embeddings[i][j] {
					t.Logf("First difference at index %d: %v vs %v", j, embeddings[0][j], embeddings[i][j])
					break
				}
			}
		}
	}

	t.Logf("Successfully generated identical embeddings for image.png")
	t.Logf("Embedding length: %d", len(embeddings[0]))
	t.Logf("First 10 values: %v", embeddings[0][:10])
}

// TestEmbeddingContentBased tests that embeddings depend only on content, not filenames
func TestEmbeddingContentBased(t *testing.T) {
	// Find the image.png file
	var imagePath string
	possiblePaths := []string{
		"image.png",           // current directory
		"../image.png",        // parent directory
		"../../image.png",     // grandparent
		"/Users/ritom/Projects/pocketbase/image.png", // absolute path
	}

	for _, path := range possiblePaths {
		if _, err := os.Stat(path); err == nil {
			imagePath = path
			break
		}
	}

	if imagePath == "" {
		t.Skip("image.png not found in any expected location, skipping content-based test")
		return
	}

	t.Logf("Using image file: %s", imagePath)

	embedder := NewRealImageEmbedder(384)

	// Read the file content
	content, err := os.ReadFile(imagePath)
	assert.NoError(t, err)

	// Create temporary files with different names but same content
	tempDir := t.TempDir()
	file1 := filepath.Join(tempDir, "test1.jpg")
	file2 := filepath.Join(tempDir, "test2.png")
	file3 := filepath.Join(tempDir, "completely_different_name.gif")

	// Write same content to all files
	err = os.WriteFile(file1, content, 0644)
	assert.NoError(t, err)
	err = os.WriteFile(file2, content, 0644)
	assert.NoError(t, err)
	err = os.WriteFile(file3, content, 0644)
	assert.NoError(t, err)

	// Generate embeddings for all files
	emb1, err := embedder.EmbedImage(file1)
	assert.NoError(t, err)
	emb2, err := embedder.EmbedImage(file2)
	assert.NoError(t, err)
	emb3, err := embedder.EmbedImage(file3)
	assert.NoError(t, err)

	// All embeddings should be identical (content-based, not filename-based)
	assert.Equal(t, emb1, emb2, "Embeddings should be identical for same content regardless of filename")
	assert.Equal(t, emb1, emb3, "Embeddings should be identical for same content regardless of filename")

	t.Logf("Content-based embedding test passed - same content produces identical embeddings")
}

// TestEmbeddingPerformance tests that embedding generation is fast enough
func TestEmbeddingPerformance(t *testing.T) {
	imagePath := "image.png"

	// Check if the file exists
	if _, err := os.Stat(imagePath); os.IsNotExist(err) {
		t.Skip("image.png not found in project root, skipping performance test")
		return
	}

	embedder := NewRealImageEmbedder(384)

	// Measure time for multiple embeddings
	start := time.Now()
	iterations := 10

	for i := 0; i < iterations; i++ {
		_, err := embedder.EmbedImage(imagePath)
		assert.NoError(t, err)
	}

	duration := time.Since(start)
	avgDuration := duration / time.Duration(iterations)

	// Should be fast enough (< 50ms per embedding)
	maxDuration := 50 * time.Millisecond
	assert.True(t, avgDuration < maxDuration,
		"Embedding generation too slow: %v per embedding (max allowed: %v)",
		avgDuration, maxDuration)

	t.Logf("Embedding performance: %v per embedding (%d iterations in %v)",
		avgDuration, iterations, duration)
}

// TestEmbeddingDifferentContent tests that different content produces different embeddings
func TestEmbeddingDifferentContent(t *testing.T) {
	embedder := NewRealImageEmbedder(384)

	// Create test content with different patterns
	content1 := make([]byte, 1024)
	for i := range content1 {
		content1[i] = byte(i % 256) // Pattern 1
	}

	content2 := make([]byte, 1024)
	for i := range content2 {
		content2[i] = byte((i * 7) % 256) // Pattern 2 - different
	}

	// Create temporary files
	tempDir := t.TempDir()
	file1 := filepath.Join(tempDir, "content1.bin")
	file2 := filepath.Join(tempDir, "content2.bin")

	err := os.WriteFile(file1, content1, 0644)
	assert.NoError(t, err)
	err = os.WriteFile(file2, content2, 0644)
	assert.NoError(t, err)

	// Generate embeddings
	emb1, err := embedder.EmbedImage(file1)
	assert.NoError(t, err)
	emb2, err := embedder.EmbedImage(file2)
	assert.NoError(t, err)

	// Embeddings should be different
	assert.NotEqual(t, emb1, emb2, "Different content should produce different embeddings")

	// Calculate similarity (should be low)
	similarity := cosineSimilarity(emb1, emb2)
	assert.True(t, similarity < 0.5, "Different content should have low similarity (got %.3f)", similarity)

	t.Logf("Different content test passed - similarity between different content: %.3f", similarity)
}
