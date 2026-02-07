package apis

import (
	crand "crypto/rand"
	"encoding/hex"
	"fmt"
	"math"
	mrand "math/rand"
	"net/http"
	"sort"
	"strconv"
	"time"

	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/router"
)

// bindVectorsApi registers the vector api endpoints.
func bindVectorsApi(app core.App, rg *router.RouterGroup[*core.RequestEvent]) {
	sub := rg.Group("/vectors")

	// List all vectors
	sub.GET("", vectorsList).Bind(RequireAuth())

	// Upsert vectors
	sub.POST("/upsert", vectorsUpsert).Bind(RequireAuth())

	// Search vectors
	sub.POST("/search", func(e *core.RequestEvent) error {
		return vectorsSearch(e)
	}).Bind(RequireAuth())

	// Get vector by ID
	sub.GET("/{id}", func(e *core.RequestEvent) error {
		return vectorView(e)
	}).Bind(RequireAuth())

	// Delete vector by ID
	sub.DELETE("/{id}", func(e *core.RequestEvent) error {
		return vectorDelete(e)
	}).Bind(RequireAuth())
}

func vectorsUpsert(e *core.RequestEvent) error {
	var data struct {
		Vectors []*core.VectorRecord `json:"vectors"`
		ImageData string `json:"imageData"` // base64 encoded image data from UI
	}

	if err := e.BindBody(&data); err != nil {
		return e.BadRequestError("Failed to parse request body", err)
	}

	if len(data.Vectors) == 0 {
		return e.BadRequestError("No vectors provided", nil)
	}

	// Validate vectors and auto-generate IDs/embeddings if needed
	for _, v := range data.Vectors {
		if v.ID == "" {
			// Auto-generate ID like PocketBase records
			v.ID = generateRandomID()
		}

		if v.Type == "" {
			return e.BadRequestError("Vector type is required", nil)
		}

		// Set creation time if not provided
		if v.CreatedAt.IsZero() {
			v.CreatedAt = time.Now()
		}

		// Initialize metadata if nil
		if v.Metadata == nil {
			v.Metadata = make(map[string]interface{})
		}

		// Store image data in metadata for image types (for UI display)
		if v.Type == "image" && data.ImageData != "" {
			v.Metadata["previewUrl"] = "data:image;base64," + data.ImageData
			println("[VectorAPI] Stored image preview in metadata")
		}

		// Auto-generate embedding if not provided or empty
		if len(v.Embedding) == 0 {
			// Use real embedding generation
			embeddingManager := core.NewEmbeddingManager()

			// For image/video types, we need the actual file content
			if v.Type == "image" || v.Type == "video" {
				// Check if we have base64 image data in the request
				if data.ImageData != "" && v.Type == "image" {
					println("[VectorAPI] Generating image embedding from base64 data")
					// Decode base64 image data and generate embedding
					embedding, err := embeddingManager.EmbedImageFromBase64(data.ImageData)
					if err != nil {
						println("[VectorAPI] Error generating image embedding from base64:", err.Error())
						// Fallback to text-based embedding
						v.Embedding = embeddingManager.GenerateEmbedding(v.RefID, v.Type)
					} else {
						v.Embedding = embedding
					}
				} else {
					// Use refID or metadata for content (legacy path)
					content := ""
					if v.RefID != "" {
						content = v.RefID
					} else {
						content = v.Type
						if v.Metadata != nil {
							for key, value := range v.Metadata {
								content += " " + key + ":" + fmt.Sprintf("%v", value)
							}
						}
					}

					println("[VectorAPI] Generating", v.Type, "embedding for content:", content[:min(100, len(content))])
					if v.Type == "image" {
						embedding, err := embeddingManager.EmbedImage(content)
						if err != nil {
							println("[VectorAPI] Error generating image embedding:", err.Error())
							// Fallback to text-based embedding
							v.Embedding = embeddingManager.GenerateEmbedding(content, v.Type)
						} else {
							v.Embedding = embedding
						}
					} else if v.Type == "video" {
						embedding, err := embeddingManager.EmbedVideo(content)
						if err != nil {
							println("[VectorAPI] Error generating video embedding:", err.Error())
							// Fallback to text-based embedding
							v.Embedding = embeddingManager.GenerateEmbedding(content, v.Type)
						} else {
							v.Embedding = embedding
						}
					}
				}
			} else {
				// For text and other types, use metadata-based content
				content := v.Type

				// Add reference ID if available (for linking to records)
				if v.RefID != "" {
					content += " " + v.RefID
				}

				// Add metadata for richer embeddings
				if v.Metadata != nil {
					for key, value := range v.Metadata {
						content += " " + key + ":" + fmt.Sprintf("%v", value)
					}
				}

				println("[VectorAPI] Generating", v.Type, "embedding for content:", content[:min(100, len(content))])
				v.Embedding = embeddingManager.GenerateEmbedding(content, v.Type)
			}

			println("[VectorAPI] Generated embedding with", len(v.Embedding), "dimensions")
		}
	}

	// Upsert vectors
	if err := e.App.VectorIndex().Upsert(data.Vectors); err != nil {
		return e.InternalServerError("Failed to upsert vectors", err)
	}

	return e.JSON(http.StatusOK, map[string]any{
		"message": "Vectors upserted successfully",
		"count":   len(data.Vectors),
	})
}

func vectorsSearch(e *core.RequestEvent) error {
	var data struct {
		Embedding []float32               `json:"embedding"`
		Text      string                  `json:"text"`
		ImageData string                  `json:"imageData"` // base64 encoded image
		Top       int                     `json:"top"`
		Type      string                  `json:"type"`
		Filters   map[string]interface{} `json:"filters"`
	}

	if err := e.BindBody(&data); err != nil {
		return e.BadRequestError("Failed to parse request body", err)
	}

	var embedding []float32
	embeddingManager := core.NewEmbeddingManager()

	// Determine search type and set appropriate filters
	searchType := ""
	if data.Text != "" {
		// Text search - filter to text vectors only
		searchType = "text"
		embedding = embeddingManager.GenerateEmbedding(data.Text, "text")
		println("[VectorAPI] Generated embedding for text search:", data.Text[:min(50, len(data.Text))])
	} else if data.ImageData != "" {
		// Image search - filter to image vectors only
		searchType = "image"
		println("[VectorAPI] Processing image data for search")

		// Generate proper embedding from base64 image data
		var err error
		embedding, err = embeddingManager.EmbedImageFromBase64(data.ImageData)
		if err != nil {
			return e.InternalServerError("Failed to generate embedding from image data", err)
		}

		println("[VectorAPI] Generated proper embedding for image search")
	} else if len(data.Embedding) > 0 {
		// Use provided embedding - search all types
		searchType = data.Type // Use provided type filter
		embedding = data.Embedding
	} else {
		return e.BadRequestError("Either 'embedding' array, 'text' string, or 'imageData' is required", nil)
	}

	if data.Top <= 0 {
		data.Top = 10
	}
	if data.Top > 100 {
		data.Top = 100
	}

	searchResults := e.App.VectorIndex().Search(embedding, data.Top, searchType, data.Filters)

	// Convert search results to full vector records with scores
	var results []map[string]interface{}
	for _, sr := range searchResults {
		if record, exists := e.App.VectorIndex().Get(sr.ID); exists {
			result := map[string]interface{}{
				"id":         record.ID,
				"type":       record.Type,
				"ref_id":     record.RefID,
				"embedding":  record.Embedding,
				"metadata":   record.Metadata,
				"created_at": record.CreatedAt,
				"score":      sr.Score,
			}
			results = append(results, result)
		}
	}

	return e.JSON(http.StatusOK, map[string]any{
		"results": results,
	})
}

func vectorsList(e *core.RequestEvent) error {
	println("[VectorAPI] ===== vectorsList called =====")

	// Parse pagination and filtering parameters like PocketBase collections
	page := 1
	perPage := 50

	if pageParam := e.Request.URL.Query().Get("page"); pageParam != "" {
		if p, err := strconv.Atoi(pageParam); err == nil && p > 0 {
			page = p
			println("[VectorAPI] Parsed page parameter:", page)
		}
	}

	if perPageParam := e.Request.URL.Query().Get("perPage"); perPageParam != "" {
		if pp, err := strconv.Atoi(perPageParam); err == nil && pp > 0 && pp <= 1000 {
			perPage = pp
			println("[VectorAPI] Parsed perPage parameter:", perPage)
		}
	}

	println("[VectorAPI] Calling VectorIndex.GetAll()")
	// Get all vectors
	allVectors := e.App.VectorIndex().GetAll()
	println("[VectorAPI] GetAll() returned", len(allVectors), "vectors")

	// Apply sorting (simple implementation - sort by created date desc)
	// In a real implementation, you'd want more sophisticated sorting
	println("[VectorAPI] Sorting vectors by created date")
	sort.Slice(allVectors, func(i, j int) bool {
		return allVectors[i].CreatedAt.After(allVectors[j].CreatedAt)
	})

	// Apply pagination
	totalItems := len(allVectors)
	totalPages := (totalItems + perPage - 1) / perPage

	println("[VectorAPI] Pagination: totalItems =", totalItems, ", totalPages =", totalPages, ", page =", page, ", perPage =", perPage)

	// Ensure page is within bounds
	if page > totalPages && totalPages > 0 {
		page = totalPages
		println("[VectorAPI] Adjusted page to", page)
	}

	startIndex := (page - 1) * perPage
	endIndex := startIndex + perPage

	if startIndex >= totalItems {
		startIndex = totalItems
		endIndex = totalItems
	} else if endIndex > totalItems {
		endIndex = totalItems
	}

	println("[VectorAPI] Slice indices: start =", startIndex, ", end =", endIndex)

	vectors := allVectors[startIndex:endIndex]
	println("[VectorAPI] Returning", len(vectors), "vectors for this page")

	result := map[string]any{
		"page":       page,
		"perPage":    perPage,
		"totalItems": totalItems,
		"totalPages": totalPages,
		"items":      vectors,
	}

	println("[VectorAPI] Response structure created, sending JSON")

	// Debug: check what the date looks like
	if len(vectors) > 0 {
		println("[VectorAPI] Sample vector CreatedAt:", vectors[0].CreatedAt.Format(time.RFC3339))
	}

	return e.JSON(http.StatusOK, result)
}

func vectorView(e *core.RequestEvent) error {
	id := e.Request.PathValue("id")
	if id == "" {
		return e.NotFoundError("", nil)
	}

	record, exists := e.App.VectorIndex().Get(id)
	if !exists {
		return e.NotFoundError("", nil)
	}

	return e.JSON(http.StatusOK, record)
}

func vectorDelete(e *core.RequestEvent) error {
	id := e.Request.PathValue("id")
	if id == "" {
		return e.NotFoundError("", nil)
	}

	if err := e.App.VectorIndex().Delete(id); err != nil {
		return e.InternalServerError("Failed to delete vector", err)
	}

	return e.NoContent(http.StatusNoContent)
}

// generateRandomEmbedding generates a random vector embedding for testing/auto-generation.
func generateRandomEmbedding(dimensions int) []float32 {
	r := mrand.New(mrand.NewSource(time.Now().UnixNano()))
	embedding := make([]float32, dimensions)
	for i := range embedding {
		// Generate values between -1 and 1, normalized
		embedding[i] = r.Float32()*2 - 1
	}
	return embedding
}

// generateRandomID generates a random ID similar to PocketBase records.
func generateRandomID() string {
	bytes := make([]byte, 15)
	if _, err := crand.Read(bytes); err != nil {
		// Fallback to timestamp-based ID
		return hex.EncodeToString([]byte(time.Now().Format("20060102150405")))[:15]
	}
	return hex.EncodeToString(bytes)[:15]
}

// normalizeVector applies L2 normalization to a vector
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
