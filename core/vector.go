package core

import (
	"encoding/json"
	"math"
	"os"
	"path/filepath"
	"sort"
	"sync"
	"time"
)

// VectorRecord represents a vector entry in the vector database.
type VectorRecord struct {
	ID        string                 `json:"id"`
	Type      string                 `json:"type"`        // text / image / video / file
	RefID     string                 `json:"ref_id"`      // optional: record ID in collection
	Embedding []float32              `json:"embedding"`   // vector
	Metadata  map[string]interface{} `json:"metadata"`    // tags, size, mimetype
	CreatedAt time.Time              `json:"created_at"`
}

// VectorSearchResult represents a search result with score.
type VectorSearchResult struct {
	ID    string  `json:"id"`
	Score float32 `json:"score"`
	RefID string  `json:"ref_id"`
}

// VectorIndex manages in-memory vector storage and search.
type VectorIndex struct {
	mu      sync.RWMutex
	vectors map[string]*VectorRecord
	dataDir string
}

// NewVectorIndex creates a new vector index.
func NewVectorIndex(dataDir string) *VectorIndex {
	return &VectorIndex{
		vectors: make(map[string]*VectorRecord),
		dataDir: dataDir,
	}
}

// Load loads vectors from disk.
func (vi *VectorIndex) Load() error {
	vi.mu.Lock()
	defer vi.mu.Unlock()

	vectorsDir := filepath.Join(vi.dataDir, "vectors")
	if err := os.MkdirAll(vectorsDir, 0755); err != nil {
		return err
	}

	filePath := filepath.Join(vectorsDir, "vectors.json")
	data, err := os.ReadFile(filePath)
	if err != nil {
		if os.IsNotExist(err) {
			return nil // no file yet
		}
		return err
	}

	var records []*VectorRecord
	if err := json.Unmarshal(data, &records); err != nil {
		return err
	}

	for _, record := range records {
		vi.vectors[record.ID] = record
	}

	return nil
}

// Save saves vectors to disk.
// NOTE: This method assumes the caller already holds the appropriate lock.
func (vi *VectorIndex) Save() error {
	vectorsDir := filepath.Join(vi.dataDir, "vectors")
	if err := os.MkdirAll(vectorsDir, 0755); err != nil {
		return err
	}

	var records []*VectorRecord
	for _, v := range vi.vectors {
		records = append(records, v)
	}

	data, err := json.MarshalIndent(records, "", "  ")
	if err != nil {
		return err
	}

	filePath := filepath.Join(vectorsDir, "vectors.json")
	return os.WriteFile(filePath, data, 0644)
}

// Insert adds or updates a vector.
func (vi *VectorIndex) Insert(record *VectorRecord) error {
	vi.mu.Lock()
	defer vi.mu.Unlock()

	if record.CreatedAt.IsZero() {
		record.CreatedAt = time.Now()
	}

	vi.vectors[record.ID] = record
	return vi.Save()
}

// Update updates an existing vector.
func (vi *VectorIndex) Update(record *VectorRecord) error {
	return vi.Insert(record)
}

// Delete removes a vector.
func (vi *VectorIndex) Delete(id string) error {
	vi.mu.Lock()
	defer vi.mu.Unlock()

	delete(vi.vectors, id)
	return vi.Save()
}

// Get retrieves a vector by ID.
func (vi *VectorIndex) Get(id string) (*VectorRecord, bool) {
	vi.mu.RLock()
	defer vi.mu.RUnlock()

	record, exists := vi.vectors[id]
	return record, exists
}

// GetAll returns all vectors in the index.
func (vi *VectorIndex) GetAll() []*VectorRecord {
	println("[VectorIndex] GetAll() called")

	vi.mu.RLock()
	println("[VectorIndex] Got read lock in GetAll")

	count := len(vi.vectors)
	println("[VectorIndex] Found", count, "vectors in index")

	var all []*VectorRecord
	for id, record := range vi.vectors {
		all = append(all, record)
		println("[VectorIndex] Added vector", id, "to results")
	}

	println("[VectorIndex] Returning", len(all), "vectors from GetAll")
	vi.mu.RUnlock()
	println("[VectorIndex] Released read lock in GetAll")

	return all
}

// Search performs cosine similarity search.
func (vi *VectorIndex) Search(queryEmbedding []float32, top int, typ string, filters map[string]interface{}) []VectorSearchResult {
	vi.mu.RLock()
	defer vi.mu.RUnlock()

	var candidates []*VectorRecord
	for _, record := range vi.vectors {
		if typ != "" && record.Type != typ {
			continue
		}
		candidates = append(candidates, record)
	}

	type scored struct {
		record *VectorRecord
		score  float32
	}

	var scoredResults []scored
	for _, record := range candidates {
		if len(record.Embedding) > 0 {
			score := cosineSimilarity(queryEmbedding, record.Embedding)
			if !math.IsNaN(float64(score)) {
				scoredResults = append(scoredResults, scored{record: record, score: score})
			}
		}
	}

	// Sort by score descending
	sort.Slice(scoredResults, func(i, j int) bool {
		return scoredResults[i].score > scoredResults[j].score
	})

	// Apply similarity threshold and filters
	var results []VectorSearchResult
	for _, sr := range scoredResults {
		if len(results) >= top {
			break
		}

		// Skip results with low similarity scores
		// Cosine similarity ranges from -1 (opposite) to 1 (identical)
		// For image search, we want scores > 0.5 for meaningful similarity
		if sr.score < 0.5 {
			continue
		}

		// Apply metadata filters
		if !matchesFilters(sr.record.Metadata, filters) {
			continue
		}

		results = append(results, VectorSearchResult{
			ID:    sr.record.ID,
			Score: sr.score,
			RefID: sr.record.RefID,
		})
	}

	return results
}

// cosineSimilarity computes cosine similarity between two vectors.
func cosineSimilarity(a, b []float32) float32 {
	if len(a) != len(b) {
		return 0
	}

	var dotProduct, normA, normB float32
	for i := range a {
		dotProduct += a[i] * b[i]
		normA += a[i] * a[i]
		normB += b[i] * b[i]
	}

	if normA == 0 || normB == 0 {
		return 0
	}

	return dotProduct / (float32(math.Sqrt(float64(normA))) * float32(math.Sqrt(float64(normB))))
}

// matchesFilters checks if metadata matches the filters.
func matchesFilters(metadata map[string]interface{}, filters map[string]interface{}) bool {
	for key, value := range filters {
		if metaVal, exists := metadata[key]; !exists || metaVal != value {
			return false
		}
	}
	return true
}

// Upsert adds or updates multiple vectors.
func (vi *VectorIndex) Upsert(records []*VectorRecord) error {
	vi.mu.Lock()
	defer vi.mu.Unlock()

	for i, record := range records {
		if record.CreatedAt.IsZero() {
			record.CreatedAt = time.Now()
		}
		vi.vectors[record.ID] = record
		// Log successful storage
		// Note: We can't use logger here as VectorIndex doesn't have access to app logger
		// But we can add debug prints for now
		_ = i // avoid unused variable warning
	}

	return vi.Save()
}
