package core

import (
	"github.com/pocketbase/dbx"
)

// FileQuery returns a new File select query.
func (app *BaseApp) FileQuery() *dbx.SelectQuery {
	return app.ModelQuery(&File{})
}

// FindFileById finds a single File entry by its id.
func (app *BaseApp) FindFileById(id string) (*File, error) {
	model := &File{}

	err := app.FileQuery().
		AndWhere(dbx.HashExp{"id": id}).
		Limit(1).
		One(model)

	if err != nil {
		return nil, err
	}

	return model, nil
}

// FindFiles returns all File models matching the provided filter (if any).
//
// Returns all files if no filter is provided.
func (app *BaseApp) FindFiles(exprs ...dbx.Expression) ([]*File, error) {
	files := []*File{}

	query := app.FileQuery()

	for _, expr := range exprs {
		query.AndWhere(expr)
	}

	err := query.All(&files)

	return files, err
}

// CountFiles returns the total number of files.
func (app *BaseApp) CountFiles(exprs ...dbx.Expression) (int64, error) {
	var total int64

	query := app.FileQuery().Select("count(*)")

	for _, expr := range exprs {
		query.AndWhere(expr)
	}

	err := query.Row(&total)

	return total, err
}
