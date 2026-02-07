package core

import (
	"database/sql"
	"encoding/json"

	"github.com/pocketbase/pocketbase/tools/types"
	"github.com/spf13/cast"
)

var _ Model = (*File)(nil)

// File defines a standalone file entity that can exist independently of records.
type File struct {
	BaseModel

	// OriginalName is the original uploaded file name.
	OriginalName string `db:"original_name" json:"original_name"`

	// StoredName is the sanitized stored file name (with random suffix).
	StoredName string `db:"stored_name" json:"stored_name"`

	// Mime is the file MIME type.
	Mime string `db:"mime" json:"mime"`

	// Size is the file size in bytes.
	Size int64 `db:"size" json:"size"`

	// StoragePath is the relative storage path within pb_data/storage.
	StoragePath string `db:"storage_path" json:"storage_path"`

	// Directory is an optional subdirectory within storage.
	Directory string `db:"directory" json:"directory"`

	// Protected indicates if the file requires a token for access.
	Protected bool `db:"protected" json:"protected"`

	// CreatedBy is the ID of the user who uploaded the file (nullable).
	CreatedBy sql.NullString `db:"created_by" json:"created_by"`

	// ReferencedBy is a JSON array of {collection, record, field} references.
	ReferencedBy types.JSONArray[FileReference] `db:"referenced_by" json:"referenced_by"`

	// StorageAdapter is the storage backend used (local or s3).
	StorageAdapter string `db:"storage_adapter" json:"storage_adapter"`

	// CreatedAt is the file creation timestamp.
	CreatedAt types.DateTime `db:"created_at" json:"created_at"`

	// UpdatedAt is the file last update timestamp.
	UpdatedAt types.DateTime `db:"updated_at" json:"updated_at"`

	// URL is the absolute download link for the file (not persisted).
	URL string `db:"-" json:"url"`
}

// FileReference represents a reference to a file from a record field.
type FileReference struct {
	Collection string `json:"collection"`
	Record     string `json:"record"`
	Field      string `json:"field"`
}

// TableName returns the table name associated with the File model.
func (f *File) TableName() string {
	return "_files"
}

// IsReferenced returns true if the file is referenced by at least one record.
func (f *File) IsReferenced() bool {
	return len(f.ReferencedBy) > 0
}

// AddReference adds a new reference to the file.
func (f *File) AddReference(collection, record, field string) {
	ref := FileReference{
		Collection: collection,
		Record:     record,
		Field:      field,
	}

	// Check if reference already exists
	for _, existing := range f.ReferencedBy {
		if existing.Collection == ref.Collection &&
			existing.Record == ref.Record &&
			existing.Field == ref.Field {
			return
		}
	}

	f.ReferencedBy = append(f.ReferencedBy, ref)
}

// RemoveReference removes a reference from the file.
func (f *File) RemoveReference(collection, record, field string) {
	for i, ref := range f.ReferencedBy {
		if ref.Collection == collection &&
			ref.Record == record &&
			ref.Field == field {
			f.ReferencedBy = append(f.ReferencedBy[:i], f.ReferencedBy[i+1:]...)
			break
		}
	}
}

// PublicExport returns a public-safe version of the file data.
func (f *File) PublicExport() map[string]any {
	return map[string]any{
		"id":             f.Id,
		"original_name":  f.OriginalName,
		"stored_name":    f.StoredName,
		"mime":           f.Mime,
		"size":           f.Size,
		"protected":      f.Protected,
		"created_by":     f.CreatedBy,
		"referenced_by":  f.ReferencedBy,
		"storage_adapter": f.StorageAdapter,
		"created_at":      f.CreatedAt,
		"updated_at":      f.UpdatedAt,
		"url":             f.URL,
	}
}

// MarshalJSON implements the json.Marshaler interface.
func (f File) MarshalJSON() ([]byte, error) {
	return json.Marshal(f.PublicExport())
}

// UnmarshalJSON implements the json.Unmarshaler interface.
func (f *File) UnmarshalJSON(data []byte) error {
	var raw map[string]any
	if err := json.Unmarshal(data, &raw); err != nil {
		return err
	}

	f.Id = cast.ToString(raw["id"])
	f.OriginalName = cast.ToString(raw["original_name"])
	f.StoredName = cast.ToString(raw["stored_name"])
	f.Mime = cast.ToString(raw["mime"])
	f.Size = cast.ToInt64(raw["size"])
	f.StoragePath = cast.ToString(raw["storage_path"])
	f.Directory = cast.ToString(raw["directory"])
	f.Protected = cast.ToBool(raw["protected"])
	f.CreatedBy.Scan(raw["created_by"])
	f.StorageAdapter = cast.ToString(raw["storage_adapter"])
	f.URL = cast.ToString(raw["url"])

	if refs, ok := raw["referenced_by"].([]any); ok {
		f.ReferencedBy = make(types.JSONArray[FileReference], len(refs))
		for i, ref := range refs {
			if refMap, ok := ref.(map[string]any); ok {
				f.ReferencedBy[i] = FileReference{
					Collection: cast.ToString(refMap["collection"]),
					Record:     cast.ToString(refMap["record"]),
					Field:      cast.ToString(refMap["field"]),
				}
			}
		}
	}

	if createdAt, err := types.ParseDateTime(raw["created_at"]); err == nil {
		f.CreatedAt = createdAt
	} else {
		f.CreatedAt = types.NowDateTime()
	}

	if updatedAt, err := types.ParseDateTime(raw["updated_at"]); err == nil {
		f.UpdatedAt = updatedAt
	} else {
		f.UpdatedAt = types.NowDateTime()
	}

	return nil
}



// PreSave is called before saving the file to update timestamps.
func (f *File) PreSave() {
	now := types.NowDateTime()
	if f.CreatedAt.IsZero() {
		f.CreatedAt = now
	}
	f.UpdatedAt = now
}
