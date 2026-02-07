package apis

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/gabriel-vasile/mimetype"
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/filesystem"
	"github.com/pocketbase/pocketbase/tools/router"
	"github.com/pocketbase/pocketbase/tools/types"
)

// bindFilesApi registers the standalone file api endpoints.
func bindFilesApi(app core.App, rg *router.RouterGroup[*core.RequestEvent]) {
	sub := rg.Group("/files")

	// Upload standalone files (with dynamic body limit)
	sub.POST("/upload", func(e *core.RequestEvent) error {
		return filesUpload(e)
	}).Bind(RequireAuth()).Bind(dynamicFileUploadBodyLimit())

	// List files
	sub.GET("", func(e *core.RequestEvent) error {
		return filesList(e)
	})

	// Get file by ID
	sub.GET("/{id}", func(e *core.RequestEvent) error {
		return fileView(e)
	})

	// Delete file by ID
	sub.DELETE("/{id}", func(e *core.RequestEvent) error {
		return fileDelete(e)
	}).Bind(RequireAuth())

	// Download file by ID and filename
	sub.GET("/{id}/{filename}", func(e *core.RequestEvent) error {
		return fileDownload(e)
	})
}

func filesUpload(e *core.RequestEvent) error {
	// Get max upload size from settings
	maxUploadSize := e.App.Settings().FileStorage.MaxUploadSize
	if maxUploadSize < 0 {
		maxUploadSize = 32 << 20 // 32MB default
	}
	// If maxUploadSize is 0, uploads are disabled
	if maxUploadSize == 0 {
		return e.BadRequestError("File uploads are disabled", nil)
	}

	// Parse multipart form with size limit
	err := e.Request.ParseMultipartForm(maxUploadSize)
	if err != nil {
		return e.BadRequestError("Failed to parse multipart form", err)
	}

	files := e.Request.MultipartForm.File["files"]
	if len(files) == 0 {
		return e.BadRequestError("No files provided", nil)
	}

	uploadedFiles := make([]*core.File, 0, len(files))

	for _, fileHeader := range files {
		// Check file size against limit
		if fileHeader.Size > maxUploadSize {
			return e.BadRequestError("File size exceeds maximum allowed upload size", nil)
		}
		// Open the uploaded file
		src, err := fileHeader.Open()
		if err != nil {
			return e.InternalServerError("Failed to open uploaded file", err)
		}
		defer src.Close()

		// Create filesystem.File from the uploaded file
		file, err := filesystem.NewFileFromMultipart(fileHeader)
		if err != nil {
			return e.InternalServerError("Failed to create file from upload", err)
		}

		// Detect MIME type
		fileReader, err := fileHeader.Open()
		if err != nil {
			return e.InternalServerError("Failed to open file for MIME detection", err)
		}
		mimeType, err := mimetype.DetectReader(fileReader)
		fileReader.Close()
		if err != nil {
			return e.InternalServerError("Failed to detect MIME type", err)
		}

		// Get filesystem
		fsys, err := e.App.NewFilesystem()
		if err != nil {
			return e.InternalServerError("Filesystem initialization failure", err)
		}
		defer fsys.Close()

		// Upload file to storage
		storagePath := "files/" + file.Name
		err = fsys.UploadFile(file, storagePath)
		if err != nil {
			return e.InternalServerError("Failed to upload file", err)
		}

		// Create File record
		fileRecord := &core.File{
			OriginalName:   fileHeader.Filename,
			StoredName:     file.Name,
			Mime:           mimeType.String(),
			Size:           file.Size,
			StoragePath:    storagePath,
			StorageAdapter: "local", // For now, assuming local storage
			Protected:      false,   // Default to not protected
			CreatedAt:      types.NowDateTime(),
			UpdatedAt:      types.NowDateTime(),
		}

		// Set the ID manually
		fileRecord.Id = core.GenerateDefaultRandomId()

		// Set created_by if user is authenticated
		if e.Auth != nil {
			fileRecord.CreatedBy.String = e.Auth.Id
			fileRecord.CreatedBy.Valid = true
		}

		// Save file record
		if err := e.App.Save(fileRecord); err != nil {
			// Try to cleanup uploaded file on error
			fsys.Delete(storagePath)
			return e.InternalServerError("Failed to save file record", err)
		}

		uploadedFiles = append(uploadedFiles, fileRecord)
	}

	// Populate URLs
	for _, f := range uploadedFiles {
		f.URL = e.App.Settings().Meta.AppURL + "/api/files/" + f.Id + "/" + f.StoredName
	}

	return e.JSON(http.StatusOK, map[string]any{
		"files": uploadedFiles,
	})
}

func filesList(e *core.RequestEvent) error {
	// Parse query parameters for pagination and filtering
	queryParams := e.Request.URL.Query()

	pageStr := queryParams.Get("page")
	perPageStr := queryParams.Get("perPage")
	filter := queryParams.Get("filter")

	page := 1
	perPage := 30

	if pageStr != "" {
		if p, err := strconv.Atoi(pageStr); err == nil && p > 0 {
			page = p
		}
	}

	if perPageStr != "" {
		if pp, err := strconv.Atoi(perPageStr); err == nil && pp > 0 && pp <= 1000 {
			perPage = pp
		}
	}

	// Calculate offset
	offset := (page - 1) * perPage

	// Build query
	query := e.App.FileQuery()

	// Apply filter if provided
	if filter != "" {
		// For now, simple filtering by name - could be enhanced later
		query.AndWhere(dbx.Like("original_name", "%"+filter+"%"))
	}

	// Get total count
	totalCount, err := e.App.CountFiles()
	if err != nil {
		return e.InternalServerError("Failed to count files", err)
	}

	// Get paginated results
	files := []*core.File{}
	err = query.
		OrderBy("created_at DESC").
		Limit(int64(perPage)).
		Offset(int64(offset)).
		All(&files)
	if err != nil {
		return e.InternalServerError("Failed to fetch files", err)
	}

	// Calculate total pages
	totalPages := (totalCount + int64(perPage) - 1) / int64(perPage)

	return e.JSON(http.StatusOK, map[string]any{
		"page":        page,
		"perPage":     perPage,
		"totalItems":  totalCount,
		"totalPages":  totalPages,
		"items":       files,
	})
}

func fileView(e *core.RequestEvent) error {
	id := e.Request.PathValue("id")
	if id == "" {
		return e.NotFoundError("", nil)
	}

	file, err := e.App.FindFileById(id)
	if err != nil {
		return e.NotFoundError("", err)
	}

	return e.JSON(http.StatusOK, file)
}

func fileDelete(e *core.RequestEvent) error {
	id := e.Request.PathValue("id")
	if id == "" {
		return e.NotFoundError("", nil)
	}

	file, err := e.App.FindFileById(id)
	if err != nil {
		return e.NotFoundError("", err)
	}

	// Check if user can delete (for now, only allow if they uploaded it or are superuser)
	if !e.HasSuperuserAuth() && e.Auth != nil && file.CreatedBy.String != e.Auth.Id {
		return e.ForbiddenError("You don't have permission to delete this file", nil)
	}

	// Delete from filesystem
	fsys, err := e.App.NewFilesystem()
	if err != nil {
		return e.InternalServerError("Filesystem initialization failure", err)
	}
	defer fsys.Close()

	err = fsys.Delete(file.StoragePath)
	if err != nil && !errors.Is(err, filesystem.ErrNotFound) {
		e.App.Logger().Warn("Failed to delete file from storage", "error", err, "path", file.StoragePath)
	}

	// Delete file record
	if err := e.App.Delete(file); err != nil {
		return e.InternalServerError("Failed to delete file record", err)
	}

	return e.NoContent(http.StatusNoContent)
}

func fileDownload(e *core.RequestEvent) error {
	id := e.Request.PathValue("id")
	filename := e.Request.PathValue("filename")

	if id == "" || filename == "" {
		return e.NotFoundError("", nil)
	}

	file, err := e.App.FindFileById(id)
	if err != nil {
		return e.NotFoundError("", err)
	}

	// Check if filename matches
	if file.StoredName != filename {
		return e.NotFoundError("", nil)
	}

	// Check protected access
	if file.Protected {
		originalRequestInfo, err := e.RequestInfo()
		if err != nil {
			return e.InternalServerError("Failed to load request info", err)
		}

		token := e.Request.URL.Query().Get("token")
		authRecord, _ := e.App.FindAuthRecordByToken(token, core.TokenTypeFile)

		// Create a shallow copy of the cached request data and adjust it to the current auth record (if any)
		requestInfo := *originalRequestInfo
		requestInfo.Context = core.RequestInfoContextProtectedFile
		requestInfo.Auth = authRecord

		// For standalone files, we could check if the user has permission
		// For now, just check if they have a valid file token
		if authRecord == nil {
			return e.NotFoundError("", errors.New("insufficient permissions to access the file"))
		}
	}

	fsys, err := e.App.NewFilesystem()
	if err != nil {
		return e.InternalServerError("Filesystem initialization failure", err)
	}
	defer fsys.Close()

	// Set headers to prevent clickjacking
	e.Response.Header().Del("X-Frame-Options")

	return fsys.Serve(e.Response, e.Request, file.StoragePath, file.OriginalName)
}
