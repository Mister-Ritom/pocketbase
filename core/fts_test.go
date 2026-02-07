package core_test

import (
	"testing"

	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tests"
	"github.com/stretchr/testify/assert"
)

func TestFTSManager_CheckSupport(t *testing.T) {
	app, _ := tests.NewTestApp()
	defer app.Cleanup()

	ftsManager := core.NewFTSManager(app)
	support := ftsManager.CheckSupport()

	// SQLite should be supported
	assert.True(t, support.Supported, "SQLite should support FTS")
	assert.NotEmpty(t, support.Version, "Version should be set")
}

func TestFTSManager_GetSearchableFields(t *testing.T) {
	app, _ := tests.NewTestApp()
	defer app.Cleanup()

	collection := &core.Collection{}
	collection.Name = "test"
	collection.Fields = core.NewFieldsList(
		&core.TextField{Name: "title", Searchable: true},
		&core.TextField{Name: "content", Searchable: false},
		&core.TextField{Name: "description", Searchable: true},
	)

	ftsManager := core.NewFTSManager(app)
	searchableFields := ftsManager.GetSearchableFields(collection)

	assert.Len(t, searchableFields, 2, "Should find 2 searchable fields")
	assert.Equal(t, "title", searchableFields[0].Name)
	assert.Equal(t, "description", searchableFields[1].Name)
}

func TestTextField_Searchable(t *testing.T) {
	field := &core.TextField{
		Name:       "test",
		Searchable: true,
	}

	assert.Equal(t, core.FieldTypeText, field.Type())
	assert.True(t, field.Searchable)
}
