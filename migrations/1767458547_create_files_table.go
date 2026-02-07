package migrations

import (
	"github.com/pocketbase/pocketbase/core"
)

func init() {
	core.SystemMigrations.Register(func(txApp core.App) error {
		// Create files table
		_, execErr := txApp.DB().NewQuery(`
			CREATE TABLE {{_files}} (
				[[id]]              TEXT PRIMARY KEY DEFAULT ('f'||lower(hex(randomblob(7)))) NOT NULL,
				[[original_name]]   TEXT NOT NULL,
				[[stored_name]]     TEXT NOT NULL,
				[[mime]]            TEXT NOT NULL,
				[[size]]            INTEGER DEFAULT 0 NOT NULL,
				[[storage_path]]    TEXT NOT NULL,
				[[directory]]       TEXT DEFAULT '' NOT NULL,
				[[protected]]       BOOLEAN DEFAULT FALSE NOT NULL,
				[[created_by]]      TEXT DEFAULT NULL,
				[[referenced_by]]   JSON DEFAULT '[]' NOT NULL,
				[[storage_adapter]] TEXT DEFAULT 'local' NOT NULL,
				[[created_at]]      TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL,
				[[updated_at]]      TEXT DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ')) NOT NULL
			);

			CREATE INDEX IF NOT EXISTS idx_files_created_by on {{_files}} ([[created_by]]);
			CREATE INDEX IF NOT EXISTS idx_files_protected on {{_files}} ([[protected]]);
			CREATE INDEX IF NOT EXISTS idx_files_storage_adapter on {{_files}} ([[storage_adapter]]);
			CREATE INDEX IF NOT EXISTS idx_files_created_at on {{_files}} ([[created_at]]);
		`).Execute()
		if execErr != nil {
			return execErr
		}

		return nil
	}, func(txApp core.App) error {
		// Drop files table
		if _, err := txApp.DB().DropTable("_files").Execute(); err != nil {
			return err
		}

		return nil
	})
}
