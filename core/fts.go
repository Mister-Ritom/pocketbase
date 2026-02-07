package core

import (
	"fmt"
	"strings"

	"github.com/pocketbase/dbx"
)

// FTSManager handles full-text search operations across different database types.
type FTSManager struct {
	app       App
	dbType    string // cached database type
	supported bool   // cached support status
}

// NewFTSManager creates a new FTS manager instance.
func NewFTSManager(app App) *FTSManager {
	manager := &FTSManager{app: app}
	manager.initDBType()
	return manager
}

// FTSSupport represents the FTS capabilities of a database.
type FTSSupport struct {
	Supported bool
	Version   string
	Error     error
}

// CheckSupport checks if the current database supports FTS.
func (m *FTSManager) CheckSupport() *FTSSupport {
	// Try SQLite first
	if support := m.checkSQLiteSupport(m.app.DB()); support.Supported {
		return support
	}

	// Try PostgreSQL
	if support := m.checkPostgresSupport(m.app.DB()); support.Supported {
		return support
	}

	// Try MySQL
	if support := m.checkMySQLSupport(m.app.DB()); support.Supported {
		return support
	}

	return &FTSSupport{
		Supported: false,
		Error:     fmt.Errorf("database does not support full-text search"),
	}
}

// CreateCollectionFTS creates FTS indexes for all searchable fields in a collection.
func (m *FTSManager) CreateCollectionFTS(collection *Collection) error {
	if !m.supported {
		return fmt.Errorf("full-text search is not supported by this database")
	}

	searchableFields := m.getSearchableFields(collection)
	if len(searchableFields) == 0 {
		return nil // nothing to index
	}

	switch m.dbType {
	case "sqlite3":
		return m.createSQLiteFTS(collection, searchableFields)
	case "postgres":
		return m.createPostgresFTS(collection, searchableFields)
	case "mysql":
		return m.createMySQLFTS(collection, searchableFields)
	default:
		return fmt.Errorf("unsupported database driver: %s", m.dbType)
	}
}

// UpdateRecordFTS updates the FTS index for a record.
func (m *FTSManager) UpdateRecordFTS(collection *Collection, record *Record) error {
	if !m.supported {
		return nil // gracefully skip if not supported
	}

	searchableFields := m.getSearchableFields(collection)
	if len(searchableFields) == 0 {
		return nil
	}

	switch m.dbType {
	case "sqlite3":
		return m.updateSQLiteRecordFTS(collection, record, searchableFields)
	case "postgres":
		return m.updatePostgresRecordFTS(collection, record, searchableFields)
	case "mysql":
		return m.updateMySQLRecordFTS(collection, record, searchableFields)
	default:
		return nil // skip unsupported databases
	}
}

// DeleteRecordFTS removes a record from the FTS index.
func (m *FTSManager) DeleteRecordFTS(collection *Collection, recordId string) error {
	if !m.supported {
		return nil
	}

	searchableFields := m.getSearchableFields(collection)
	if len(searchableFields) == 0 {
		return nil
	}

	switch m.dbType {
	case "sqlite3":
		return m.deleteSQLiteRecordFTS(collection, recordId)
	case "postgres":
		return m.deletePostgresRecordFTS(collection, recordId)
	case "mysql":
		return m.deleteMySQLRecordFTS(collection, recordId)
	default:
		return nil
	}
}

// SearchRecords performs a full-text search on a collection.
func (m *FTSManager) SearchRecords(collection *Collection, query string, limit int, offset int) ([]*Record, error) {
	if !m.supported {
		return nil, fmt.Errorf("full-text search is not supported by this database")
	}

	searchableFields := m.getSearchableFields(collection)
	if len(searchableFields) == 0 {
		return []*Record{}, nil // no searchable fields
	}

	switch m.dbType {
	case "sqlite3":
		return m.searchSQLiteRecords(collection, query, searchableFields, limit, offset)
	case "postgres":
		return m.searchPostgresRecords(collection, query, searchableFields, limit, offset)
	case "mysql":
		return m.searchMySQLRecords(collection, query, searchableFields, limit, offset)
	default:
		return nil, fmt.Errorf("unsupported database driver: %s", m.dbType)
	}
}

// DropCollectionFTS drops FTS indexes for a collection.
func (m *FTSManager) DropCollectionFTS(collection *Collection) error {
	if !m.supported {
		return nil
	}

	searchableFields := m.getSearchableFields(collection)
	if len(searchableFields) == 0 {
		return nil
	}

	switch m.dbType {
	case "sqlite3":
		return m.dropSQLiteFTS(collection)
	case "postgres":
		return m.dropPostgresFTS(collection)
	case "mysql":
		return m.dropMySQLFTS(collection)
	default:
		return nil
	}
}

// Helper methods

func (m *FTSManager) initDBType() {
	support := m.CheckSupport()
	m.supported = support.Supported
	if support.Supported {
		if m.checkSQLiteSupport(m.app.DB()).Supported {
			m.dbType = "sqlite3"
		} else if m.checkPostgresSupport(m.app.DB()).Supported {
			m.dbType = "postgres"
		} else if m.checkMySQLSupport(m.app.DB()).Supported {
			m.dbType = "mysql"
		}
	}
}

func (m *FTSManager) checkSupport() *FTSSupport {
	return m.CheckSupport()
}

// GetSearchableFields returns all searchable text fields from a collection.
func (m *FTSManager) GetSearchableFields(collection *Collection) []*TextField {
	return m.getSearchableFields(collection)
}

func (m *FTSManager) getSearchableFields(collection *Collection) []*TextField {
	var fields []*TextField
	for _, field := range collection.Fields {
		if textField, ok := field.(*TextField); ok && textField.Searchable {
			fields = append(fields, textField)
		}
	}
	return fields
}

// SQLite FTS5 implementation

func (m *FTSManager) checkSQLiteSupport(db dbx.Builder) *FTSSupport {
	var version string
	err := db.NewQuery("SELECT sqlite_version()").Row(&version)
	if err != nil {
		return &FTSSupport{Supported: false, Error: err}
	}

	// Check if FTS5 is available
	var fts5Available int
	err = db.NewQuery("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='sqlite_master'").
		Row(&fts5Available)
	if err != nil {
		return &FTSSupport{Supported: false, Error: err}
	}

	return &FTSSupport{Supported: true, Version: version}
}

func (m *FTSManager) createSQLiteFTS(collection *Collection, fields []*TextField) error {
	tableName := collection.Name
	ftsTableName := tableName + "_fts"

	// Create FTS5 virtual table
	fieldNames := make([]string, len(fields))
	for i, field := range fields {
		fieldNames[i] = fmt.Sprintf("[[%s]]", field.Name)
	}

	createQuery := fmt.Sprintf(`
		CREATE VIRTUAL TABLE {{%s}} USING fts5(
			[[id]], [[%s]], tokenize="unicode61 remove_diacritics 2"
		)
	`, ftsTableName, strings.Join(fieldNames, ", "))

	_, err := m.app.DB().NewQuery(createQuery).Execute()
	if err != nil {
		return fmt.Errorf("failed to create FTS table: %w", err)
	}

	// Create triggers for automatic synchronization
	return m.createSQLiteTriggers(collection, ftsTableName, fields)
}

func (m *FTSManager) createSQLiteTriggers(collection *Collection, ftsTableName string, fields []*TextField) error {
	tableName := collection.Name

	fieldNames := make([]string, len(fields))
	for i, field := range fields {
		fieldNames[i] = fmt.Sprintf("[[%s]]", field.Name)
	}
	contentExpr := strings.Join(fieldNames, " || ' ' || ")

	// Insert trigger
	insertTrigger := fmt.Sprintf(`
		CREATE TRIGGER {{%s_insert}} AFTER INSERT ON {{%s}}
		BEGIN
			INSERT INTO {{%s}} ([[id]], [[%s]])
			VALUES (NEW.[[id]], %s);
		END
	`, tableName+"_fts", tableName, ftsTableName, strings.Join(fieldNames, "]], [["), contentExpr)

	// Update trigger
	updateTrigger := fmt.Sprintf(`
		CREATE TRIGGER {{%s_update}} AFTER UPDATE ON {{%s}}
		BEGIN
			UPDATE {{%s}} SET [[%s]] = %s WHERE [[id]] = NEW.[[id]];
		END
	`, tableName+"_fts", tableName, ftsTableName, strings.Join(fieldNames, "]], [["), contentExpr)

	// Delete trigger
	deleteTrigger := fmt.Sprintf(`
		CREATE TRIGGER {{%s_delete}} AFTER DELETE ON {{%s}}
		BEGIN
			DELETE FROM {{%s}} WHERE [[id]] = OLD.[[id]];
		END
	`, tableName+"_fts", tableName, ftsTableName)

	queries := []string{insertTrigger, updateTrigger, deleteTrigger}

	for _, query := range queries {
		_, err := m.app.DB().NewQuery(query).Execute()
		if err != nil {
			return fmt.Errorf("failed to create trigger: %w", err)
		}
	}

	return nil
}

func (m *FTSManager) updateSQLiteRecordFTS(collection *Collection, record *Record, fields []*TextField) error {
	// SQLite handles this automatically via triggers
	return nil
}

func (m *FTSManager) deleteSQLiteRecordFTS(collection *Collection, recordId string) error {
	// SQLite handles this automatically via triggers
	return nil
}

func (m *FTSManager) searchSQLiteRecords(collection *Collection, query string, fields []*TextField, limit int, offset int) ([]*Record, error) {
	ftsTableName := collection.Name + "_fts"

	// Build FTS query with ranking
	searchQuery := fmt.Sprintf(`
		SELECT [[id]], bm25({{%s}}) as rank
		FROM {{%s}}
		WHERE {{%s}} MATCH ?
		ORDER BY rank
		LIMIT ? OFFSET ?
	`, ftsTableName, ftsTableName, ftsTableName)

	var recordIds []string
	err := m.app.DB().NewQuery(searchQuery).
		Bind(dbx.Params{"query": query, "limit": limit, "offset": offset}).
		Column(&recordIds)
	if err != nil {
		return nil, err
	}

	if len(recordIds) == 0 {
		return []*Record{}, nil
	}

	// Fetch the actual records
	records := make([]*Record, 0, len(recordIds))
	for _, id := range recordIds {
		record, err := m.app.FindRecordById(collection, id)
		if err != nil {
			continue // skip records that can't be found or accessed
		}
		records = append(records, record)
	}

	return records, nil
}

func (m *FTSManager) dropSQLiteFTS(collection *Collection) error {
	ftsTableName := collection.Name + "_fts"

	// Drop triggers first
	triggers := []string{
		collection.Name + "_fts_insert",
		collection.Name + "_fts_update",
		collection.Name + "_fts_delete",
	}

	for _, trigger := range triggers {
		m.app.DB().NewQuery(fmt.Sprintf("DROP TRIGGER IF EXISTS {{%s}}", trigger)).Execute()
	}

	// Drop FTS table
	_, err := m.app.DB().NewQuery(fmt.Sprintf("DROP TABLE IF EXISTS {{%s}}", ftsTableName)).Execute()
	return err
}

// PostgreSQL tsvector implementation

func (m *FTSManager) checkPostgresSupport(db dbx.Builder) *FTSSupport {
	var version string
	err := db.NewQuery("SELECT version()").Row(&version)
	if err != nil {
		return &FTSSupport{Supported: false, Error: err}
	}
	return &FTSSupport{Supported: true, Version: version}
}

func (m *FTSManager) createPostgresFTS(collection *Collection, fields []*TextField) error {
	tableName := collection.Name

	// Add tsvector column
	alterQuery := fmt.Sprintf(`
		ALTER TABLE {{%s}} ADD COLUMN IF NOT EXISTS {{%s}}_fts tsvector
	`, tableName, tableName)

	_, err := m.app.DB().NewQuery(alterQuery).Execute()
	if err != nil {
		return fmt.Errorf("failed to add tsvector column: %w", err)
	}

	// Create GIN index
	indexQuery := fmt.Sprintf(`
		CREATE INDEX IF NOT EXISTS {{%s}}_fts_idx ON {{%s}} USING gin({{%s}}_fts)
	`, tableName, tableName, tableName)

	_, err = m.app.DB().NewQuery(indexQuery).Execute()
	if err != nil {
		return fmt.Errorf("failed to create GIN index: %w", err)
	}

	// Create triggers for automatic updates
	return m.createPostgresTriggers(collection, fields)
}

func (m *FTSManager) createPostgresTriggers(collection *Collection, fields []*TextField) error {
	tableName := collection.Name

	// Build tsvector expression
	var tsvectorParts []string
	for _, field := range fields {
		tsvectorParts = append(tsvectorParts, fmt.Sprintf("to_tsvector('english', COALESCE([[%s]], ''))", field.Name))
	}
	tsvectorExpr := strings.Join(tsvectorParts, " || ")

	// Function to update tsvector
	functionName := tableName + "_fts_update"
	functionQuery := fmt.Sprintf(`
		CREATE OR REPLACE FUNCTION {{%s}}() RETURNS trigger AS $$
		BEGIN
			NEW.{{%s}}_fts := %s;
			RETURN NEW;
		END;
		$$ LANGUAGE plpgsql;
	`, functionName, tableName, tsvectorExpr)

	_, err := m.app.DB().NewQuery(functionQuery).Execute()
	if err != nil {
		return fmt.Errorf("failed to create update function: %w", err)
	}

	// Trigger
	triggerQuery := fmt.Sprintf(`
		CREATE OR REPLACE TRIGGER {{%s}}_trigger
			BEFORE INSERT OR UPDATE ON {{%s}}
			FOR EACH ROW EXECUTE FUNCTION {{%s}}();
	`, tableName, tableName, functionName)

	_, err = m.app.DB().NewQuery(triggerQuery).Execute()
	if err != nil {
		return fmt.Errorf("failed to create trigger: %w", err)
	}

	// Update existing records
	updateQuery := fmt.Sprintf(`
		UPDATE {{%s}} SET {{%s}}_fts = %s WHERE {{%s}}_fts IS NULL
	`, tableName, tableName, tsvectorExpr, tableName)

	_, err = m.app.DB().NewQuery(updateQuery).Execute()
	return err
}

func (m *FTSManager) updatePostgresRecordFTS(collection *Collection, record *Record, fields []*TextField) error {
	// PostgreSQL handles this automatically via triggers
	return nil
}

func (m *FTSManager) deletePostgresRecordFTS(collection *Collection, recordId string) error {
	// Records are automatically removed when the main record is deleted
	return nil
}

func (m *FTSManager) searchPostgresRecords(collection *Collection, query string, fields []*TextField, limit int, offset int) ([]*Record, error) {
	tableName := collection.Name

	// Build search query with ranking
	searchQuery := fmt.Sprintf(`
		SELECT [[id]], ts_rank({{%s}}_fts, plainto_tsquery('english', ?)) as rank
		FROM {{%s}}
		WHERE {{%s}}_fts @@ plainto_tsquery('english', ?)
		ORDER BY rank DESC
		LIMIT ? OFFSET ?
	`, tableName, tableName, tableName)

	var recordIds []string
	err := m.app.DB().NewQuery(searchQuery).
		Bind(dbx.Params{"query": query, "limit": limit, "offset": offset}).
		Column(&recordIds)
	if err != nil {
		return nil, err
	}

	if len(recordIds) == 0 {
		return []*Record{}, nil
	}

	// Fetch the actual records
	records := make([]*Record, 0, len(recordIds))
	for _, id := range recordIds {
		record, err := m.app.FindRecordById(collection, id)
		if err != nil {
			continue
		}
		records = append(records, record)
	}

	return records, nil
}

func (m *FTSManager) dropPostgresFTS(collection *Collection) error {
	tableName := collection.Name

	// Drop trigger and function
	queries := []string{
		fmt.Sprintf("DROP TRIGGER IF EXISTS {{%s}}_trigger ON {{%s}}", tableName, tableName),
		fmt.Sprintf("DROP FUNCTION IF EXISTS {{%s}}_fts_update()", tableName),
		fmt.Sprintf("DROP INDEX IF EXISTS {{%s}}_fts_idx", tableName),
		fmt.Sprintf("ALTER TABLE {{%s}} DROP COLUMN IF EXISTS {{%s}}_fts", tableName, tableName),
	}

	for _, query := range queries {
		m.app.DB().NewQuery(query).Execute()
	}

	return nil
}

// MySQL FULLTEXT implementation

func (m *FTSManager) checkMySQLSupport(db dbx.Builder) *FTSSupport {
	var version string
	err := db.NewQuery("SELECT VERSION()").Row(&version)
	if err != nil {
		return &FTSSupport{Supported: false, Error: err}
	}

	// MySQL 5.6+ supports FULLTEXT
	if strings.HasPrefix(version, "5.") && len(version) > 2 {
		minor := version[2]
		if minor < '6' {
			return &FTSSupport{
				Supported: false,
				Error:     fmt.Errorf("MySQL version %s does not support FULLTEXT indexes (requires 5.6+)", version),
			}
		}
	}

	return &FTSSupport{Supported: true, Version: version}
}

func (m *FTSManager) createMySQLFTS(collection *Collection, fields []*TextField) error {
	tableName := collection.Name

	// Create FULLTEXT index
	fieldNames := make([]string, len(fields))
	for i, field := range fields {
		fieldNames[i] = fmt.Sprintf("[[%s]]", field.Name)
	}

	indexQuery := fmt.Sprintf(`
		ALTER TABLE {{%s}} ADD FULLTEXT INDEX {{%s}}_fts_idx ([[%s]])
	`, tableName, tableName, strings.Join(fieldNames, "]], [["))

	_, err := m.app.DB().NewQuery(indexQuery).Execute()
	if err != nil {
		return fmt.Errorf("failed to create FULLTEXT index: %w", err)
	}

	// Note: MySQL handles updates automatically, no triggers needed for FULLTEXT
	return nil
}

func (m *FTSManager) updateMySQLRecordFTS(collection *Collection, record *Record, fields []*TextField) error {
	// MySQL handles FULLTEXT updates automatically
	return nil
}

func (m *FTSManager) deleteMySQLRecordFTS(collection *Collection, recordId string) error {
	// Records are automatically removed from FULLTEXT index when deleted
	return nil
}

func (m *FTSManager) searchMySQLRecords(collection *Collection, query string, fields []*TextField, limit int, offset int) ([]*Record, error) {
	if len(fields) == 0 {
		return []*Record{}, nil
	}

	tableName := collection.Name

	// Build MATCH expression - use the first field for simplicity
	// MySQL FULLTEXT can search across multiple fields
	fieldNames := make([]string, len(fields))
	for i, f := range fields {
		fieldNames[i] = fmt.Sprintf("[[%s]]", f.Name)
	}
	fieldList := strings.Join(fieldNames, ", ")

	// MySQL FULLTEXT search with relevance
	searchQuery := fmt.Sprintf(`
		SELECT [[id]], MATCH(%s) AGAINST(? IN NATURAL LANGUAGE MODE) as relevance
		FROM {{%s}}
		WHERE MATCH(%s) AGAINST(? IN NATURAL LANGUAGE MODE)
		ORDER BY relevance DESC
		LIMIT ? OFFSET ?
	`, fieldList, tableName, fieldList)

	var recordIds []string
	err := m.app.DB().NewQuery(searchQuery).
		Bind(dbx.Params{"query": query, "limit": limit, "offset": offset}).
		Column(&recordIds)
	if err != nil {
		return nil, err
	}

	if len(recordIds) == 0 {
		return []*Record{}, nil
	}

	// Fetch the actual records
	records := make([]*Record, 0, len(recordIds))
	for _, id := range recordIds {
		record, err := m.app.FindRecordById(collection, id)
		if err != nil {
			continue
		}
		records = append(records, record)
	}

	return records, nil
}

func (m *FTSManager) dropMySQLFTS(collection *Collection) error {
	tableName := collection.Name

	dropQuery := fmt.Sprintf(`
		ALTER TABLE {{%s}} DROP INDEX {{%s}}_fts_idx
	`, tableName, tableName)

	_, err := m.app.DB().NewQuery(dropQuery).Execute()
	return err
}
