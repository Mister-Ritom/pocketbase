package search

import (
	"fmt"
	"strings"

	"github.com/ganigeorgiev/fexpr"
	"github.com/pocketbase/dbx"
)

var TokenFunctions = map[string]func(
	argTokenResolverFunc func(fexpr.Token) (*ResolverResult, error),
	args ...fexpr.Token,
) (*ResolverResult, error){
	// geoDistance(lonA, latA, lonB, latB) calculates the Haversine
	// distance between 2 points in kilometres (https://www.movable-type.co.uk/scripts/latlong.html).
	//
	// The accepted arguments at the moment could be either a plain number or a column identifier (including NULL).
	// If the column identifier cannot be resolved and converted to a numeric value, it resolves to NULL.
	//
	// Similar to the built-in SQLite functions, geoDistance doesn't apply
	// a "match-all" constraints in case there are multiple relation fields arguments.
	// Or in other words, if a collection has "orgs" multiple relation field pointing to "orgs" collection that has "office" as "geoPoint" field,
	// then the filter: `geoDistance(orgs.office.lon, orgs.office.lat, 1, 2) < 200`
	// will evaluate to true if for at-least-one of the "orgs.office" records the function result in a value satisfying the condition (aka. "result < 200").
	"geoDistance": func(argTokenResolverFunc func(fexpr.Token) (*ResolverResult, error), args ...fexpr.Token) (*ResolverResult, error) {
		if len(args) != 4 {
			return nil, fmt.Errorf("[geoDistance] expected 4 arguments, got %d", len(args))
		}

		resolvedArgs := make([]*ResolverResult, 4)
		for i, arg := range args {
			if arg.Type != fexpr.TokenIdentifier && arg.Type != fexpr.TokenNumber {
				return nil, fmt.Errorf("[geoDistance] argument %d must be an identifier or number", i)
			}
			resolved, err := argTokenResolverFunc(arg)
			if err != nil {
				return nil, fmt.Errorf("[geoDistance] failed to resolve argument %d: %w", i, err)
			}
			resolvedArgs[i] = resolved
		}

		lonA := resolvedArgs[0].Identifier
		latA := resolvedArgs[1].Identifier
		lonB := resolvedArgs[2].Identifier
		latB := resolvedArgs[3].Identifier

		return &ResolverResult{
			NoCoalesce: true,
			Identifier: `(6371 * acos(` +
				`cos(radians(` + latA + `)) * cos(radians(` + latB + `)) * ` +
				`cos(radians(` + lonB + `) - radians(` + lonA + `)) + ` +
				`sin(radians(` + latA + `)) * sin(radians(` + latB + `))` +
				`))`,
			Params: mergeParams(resolvedArgs[0].Params, resolvedArgs[1].Params, resolvedArgs[2].Params, resolvedArgs[3].Params),
		}, nil
	},

	// contains(field, value) - checks if field contains value (for arrays) or substring (for strings)
	"contains": func(argTokenResolverFunc func(fexpr.Token) (*ResolverResult, error), args ...fexpr.Token) (*ResolverResult, error) {
		if len(args) != 2 {
			return nil, fmt.Errorf("[contains] expected 2 arguments, got %d", len(args))
		}

		field, err := argTokenResolverFunc(args[0])
		if err != nil {
			return nil, fmt.Errorf("[contains] failed to resolve field: %w", err)
		}

		value, err := argTokenResolverFunc(args[1])
		if err != nil {
			return nil, fmt.Errorf("[contains] failed to resolve value: %w", err)
		}

		return &ResolverResult{
			NoCoalesce: true,
			Identifier: "CONTAINS_PLACEHOLDER",
			Params:     mergeParams(field.Params, value.Params),
			AfterBuild: func(expr dbx.Expression) dbx.Expression {
				return &containsExpr{field: field, value: value}
			},
		}, nil
	},

	// containsAny(field, values...) - checks if field contains any of the values
	"containsAny": func(argTokenResolverFunc func(fexpr.Token) (*ResolverResult, error), args ...fexpr.Token) (*ResolverResult, error) {
		if len(args) < 2 {
			return nil, fmt.Errorf("[containsAny] expected at least 2 arguments, got %d", len(args))
		}

		field, err := argTokenResolverFunc(args[0])
		if err != nil {
			return nil, fmt.Errorf("[containsAny] failed to resolve field: %w", err)
		}

		values := make([]*ResolverResult, len(args)-1)
		for i, arg := range args[1:] {
			value, err := argTokenResolverFunc(arg)
			if err != nil {
				return nil, fmt.Errorf("[containsAny] failed to resolve value %d: %w", i, err)
			}
			values[i] = value
		}

		return &ResolverResult{
			NoCoalesce: true,
			Identifier: "CONTAINS_ANY_EXPR",
			Params:     mergeParams(append([]dbx.Params{field.Params}, collectParams(values)...)...),
			AfterBuild: func(expr dbx.Expression) dbx.Expression {
				return &containsAnyExpr{field: field, values: values}
			},
		}, nil
	},

	// containsAll(field, values...) - checks if field contains all of the values
	"containsAll": func(argTokenResolverFunc func(fexpr.Token) (*ResolverResult, error), args ...fexpr.Token) (*ResolverResult, error) {
		if len(args) < 2 {
			return nil, fmt.Errorf("[containsAll] expected at least 2 arguments, got %d", len(args))
		}

		field, err := argTokenResolverFunc(args[0])
		if err != nil {
			return nil, fmt.Errorf("[containsAll] failed to resolve field: %w", err)
		}

		values := make([]*ResolverResult, len(args)-1)
		for i, arg := range args[1:] {
			value, err := argTokenResolverFunc(arg)
			if err != nil {
				return nil, fmt.Errorf("[containsAll] failed to resolve value %d: %w", i, err)
			}
			values[i] = value
		}

		return &ResolverResult{
			NoCoalesce: true,
			Identifier: "CONTAINS_ALL_EXPR",
			Params:     mergeParams(append([]dbx.Params{field.Params}, collectParams(values)...)...),
			AfterBuild: func(expr dbx.Expression) dbx.Expression {
				return &containsAllExpr{field: field, values: values}
			},
		}, nil
	},

	// notContains(field, value) - checks if field does not contain value
	"notContains": func(argTokenResolverFunc func(fexpr.Token) (*ResolverResult, error), args ...fexpr.Token) (*ResolverResult, error) {
		if len(args) != 2 {
			return nil, fmt.Errorf("[notContains] expected 2 arguments, got %d", len(args))
		}

		field, err := argTokenResolverFunc(args[0])
		if err != nil {
			return nil, fmt.Errorf("[notContains] failed to resolve field: %w", err)
		}

		value, err := argTokenResolverFunc(args[1])
		if err != nil {
			return nil, fmt.Errorf("[notContains] failed to resolve value: %w", err)
		}

		return &ResolverResult{
			NoCoalesce: true,
			Identifier: fmt.Sprintf("NOT_CONTAINS_EXPR(%s, %s)", field.Identifier, value.Identifier),
			Params:     mergeParams(field.Params, value.Params),
			AfterBuild: func(expr dbx.Expression) dbx.Expression {
				return &notContainsExpr{field: field, value: value}
			},
		}, nil
	},

	// startsWith(field, prefix) - checks if field starts with prefix
	"startsWith": func(argTokenResolverFunc func(fexpr.Token) (*ResolverResult, error), args ...fexpr.Token) (*ResolverResult, error) {
		if len(args) != 2 {
			return nil, fmt.Errorf("[startsWith] expected 2 arguments, got %d", len(args))
		}

		field, err := argTokenResolverFunc(args[0])
		if err != nil {
			return nil, fmt.Errorf("[startsWith] failed to resolve field: %w", err)
		}

		prefix, err := argTokenResolverFunc(args[1])
		if err != nil {
			return nil, fmt.Errorf("[startsWith] failed to resolve prefix: %w", err)
		}

		return &ResolverResult{
			Identifier: fmt.Sprintf("%s LIKE (%s || '%%')", field.Identifier, prefix.Identifier),
			Params:     mergeParams(field.Params, prefix.Params),
		}, nil
	},

	// endsWith(field, suffix) - checks if field ends with suffix
	"endsWith": func(argTokenResolverFunc func(fexpr.Token) (*ResolverResult, error), args ...fexpr.Token) (*ResolverResult, error) {
		if len(args) != 2 {
			return nil, fmt.Errorf("[endsWith] expected 2 arguments, got %d", len(args))
		}

		field, err := argTokenResolverFunc(args[0])
		if err != nil {
			return nil, fmt.Errorf("[endsWith] failed to resolve field: %w", err)
		}

		suffix, err := argTokenResolverFunc(args[1])
		if err != nil {
			return nil, fmt.Errorf("[endsWith] failed to resolve suffix: %w", err)
		}

		return &ResolverResult{
			Identifier: fmt.Sprintf("%s LIKE ('%%' || %s)", field.Identifier, suffix.Identifier),
			Params:     mergeParams(field.Params, suffix.Params),
		}, nil
	},

	// regex(field, pattern) - checks if field matches regex pattern
	"regex": func(argTokenResolverFunc func(fexpr.Token) (*ResolverResult, error), args ...fexpr.Token) (*ResolverResult, error) {
		if len(args) != 2 {
			return nil, fmt.Errorf("[regex] expected 2 arguments, got %d", len(args))
		}

		field, err := argTokenResolverFunc(args[0])
		if err != nil {
			return nil, fmt.Errorf("[regex] failed to resolve field: %w", err)
		}

		pattern, err := argTokenResolverFunc(args[1])
		if err != nil {
			return nil, fmt.Errorf("[regex] failed to resolve pattern: %w", err)
		}

		return &ResolverResult{
			NoCoalesce: true,
			Identifier: "REGEX_EXPR",
			Params:     mergeParams(field.Params, pattern.Params),
			AfterBuild: func(expr dbx.Expression) dbx.Expression {
				return &regexExpr{field: field, pattern: pattern}
			},
		}, nil
	},

	// lengthGt(field, length) - checks if field length is greater than specified length
	"lengthGt": func(argTokenResolverFunc func(fexpr.Token) (*ResolverResult, error), args ...fexpr.Token) (*ResolverResult, error) {
		if len(args) != 2 {
			return nil, fmt.Errorf("[lengthGt] expected 2 arguments, got %d", len(args))
		}

		field, err := argTokenResolverFunc(args[0])
		if err != nil {
			return nil, fmt.Errorf("[lengthGt] failed to resolve field: %w", err)
		}

		length, err := argTokenResolverFunc(args[1])
		if err != nil {
			return nil, fmt.Errorf("[lengthGt] failed to resolve length: %w", err)
		}

		return &ResolverResult{
			NoCoalesce: true,
			Identifier: "LENGTH_GT_EXPR",
			Params:     mergeParams(field.Params, length.Params),
			AfterBuild: func(expr dbx.Expression) dbx.Expression {
				return &lengthGtExpr{field: field, length: length}
			},
		}, nil
	},

	// lengthLt(field, length) - checks if field length is less than specified length
	"lengthLt": func(argTokenResolverFunc func(fexpr.Token) (*ResolverResult, error), args ...fexpr.Token) (*ResolverResult, error) {
		if len(args) != 2 {
			return nil, fmt.Errorf("[lengthLt] expected 2 arguments, got %d", len(args))
		}

		field, err := argTokenResolverFunc(args[0])
		if err != nil {
			return nil, fmt.Errorf("[lengthLt] failed to resolve field: %w", err)
		}

		length, err := argTokenResolverFunc(args[1])
		if err != nil {
			return nil, fmt.Errorf("[lengthLt] failed to resolve length: %w", err)
		}

		return &ResolverResult{
			NoCoalesce: true,
			Identifier: "LENGTH_LT_EXPR",
			Params:     mergeParams(field.Params, length.Params),
			AfterBuild: func(expr dbx.Expression) dbx.Expression {
				return &lengthLtExpr{field: field, length: length}
			},
		}, nil
	},
}

// collectParams collects all Params from a slice of ResolverResult
func collectParams(results []*ResolverResult) []dbx.Params {
	params := make([]dbx.Params, len(results))
	for i, result := range results {
		params[i] = result.Params
	}
	return params
}

// -------------------------------------------------------------------
// Custom expressions for database-specific operations
// -------------------------------------------------------------------

var _ dbx.Expression = (*containsExpr)(nil)

type containsExpr struct {
	field *ResolverResult
	value *ResolverResult
}

func (e *containsExpr) Build(db *dbx.DB, params dbx.Params) string {
	driver := db.DriverName()

	switch driver {
	case "sqlite", "sqlite3":
		// For SQLite: EXISTS (SELECT 1 FROM json_each(field) WHERE value = ?)
		return fmt.Sprintf(
			"EXISTS (SELECT 1 FROM json_each(%s) WHERE value = %s)",
			e.field.Identifier,
			e.value.Identifier,
		)
	case "postgres":
		// For PostgreSQL: field @> '[value]'
		return fmt.Sprintf(
			"%s @> %s",
			e.field.Identifier,
			"("+e.value.Identifier+")",
		)
	case "mysql":
		// For MySQL: JSON_CONTAINS(field, JSON_QUOTE(?))
		return fmt.Sprintf(
			"JSON_CONTAINS(%s, JSON_QUOTE(%s))",
			e.field.Identifier,
			e.value.Identifier,
		)
	default:
		// Fallback - assume SQLite
		return fmt.Sprintf(
			"EXISTS (SELECT 1 FROM json_each(%s) WHERE value = %s)",
			e.field.Identifier,
			e.value.Identifier,
		)
	}
}

var _ dbx.Expression = (*containsAnyExpr)(nil)

type containsAnyExpr struct {
	field  *ResolverResult
	values []*ResolverResult
}

func (e *containsAnyExpr) Build(db *dbx.DB, params dbx.Params) string {
	driver := db.DriverName()

	switch driver {
	case "sqlite", "sqlite3":
		// For SQLite: multiple OR EXISTS
		conditions := make([]string, len(e.values))
		for i, value := range e.values {
			conditions[i] = fmt.Sprintf(
				"EXISTS (SELECT 1 FROM json_each(%s) WHERE value = %s)",
				e.field.Identifier,
				value.Identifier,
			)
		}
		return "(" + strings.Join(conditions, " OR ") + ")"
	case "postgres":
		// For PostgreSQL: field ?| array[...]
		identifiers := make([]string, len(e.values))
		for i, value := range e.values {
			identifiers[i] = value.Identifier
		}
		return fmt.Sprintf(
			"%s ?| array[%s]",
			e.field.Identifier,
			strings.Join(identifiers, ", "),
		)
	case "mysql":
		// For MySQL: OR of JSON_CONTAINS
		conditions := make([]string, len(e.values))
		for i, value := range e.values {
			conditions[i] = fmt.Sprintf(
				"JSON_CONTAINS(%s, JSON_QUOTE(%s))",
				e.field.Identifier,
				value.Identifier,
			)
		}
		return "(" + strings.Join(conditions, " OR ") + ")"
	default:
		// Fallback - assume SQLite
		conditions := make([]string, len(e.values))
		for i, value := range e.values {
			conditions[i] = fmt.Sprintf(
				"EXISTS (SELECT 1 FROM json_each(%s) WHERE value = %s)",
				e.field.Identifier,
				value.Identifier,
			)
		}
		return "(" + strings.Join(conditions, " OR ") + ")"
	}
}

var _ dbx.Expression = (*containsAllExpr)(nil)

type containsAllExpr struct {
	field  *ResolverResult
	values []*ResolverResult
}

func (e *containsAllExpr) Build(db *dbx.DB, params dbx.Params) string {
	driver := db.DriverName()

	switch driver {
	case "sqlite", "sqlite3":
		// For SQLite: multiple AND EXISTS
		conditions := make([]string, len(e.values))
		for i, value := range e.values {
			conditions[i] = fmt.Sprintf(
				"EXISTS (SELECT 1 FROM json_each(%s) WHERE value = %s)",
				e.field.Identifier,
				value.Identifier,
			)
		}
		return "(" + strings.Join(conditions, " AND ") + ")"
	case "postgres":
		// For PostgreSQL: field ?& array[...]
		identifiers := make([]string, len(e.values))
		for i, value := range e.values {
			identifiers[i] = value.Identifier
		}
		return fmt.Sprintf(
			"%s ?& array[%s]",
			e.field.Identifier,
			strings.Join(identifiers, ", "),
		)
	case "mysql":
		// For MySQL: AND of JSON_CONTAINS
		conditions := make([]string, len(e.values))
		for i, value := range e.values {
			conditions[i] = fmt.Sprintf(
				"JSON_CONTAINS(%s, JSON_QUOTE(%s))",
				e.field.Identifier,
				value.Identifier,
			)
		}
		return "(" + strings.Join(conditions, " AND ") + ")"
	default:
		// Fallback - assume SQLite
		conditions := make([]string, len(e.values))
		for i, value := range e.values {
			conditions[i] = fmt.Sprintf(
				"EXISTS (SELECT 1 FROM json_each(%s) WHERE value = %s)",
				e.field.Identifier,
				value.Identifier,
			)
		}
		return "(" + strings.Join(conditions, " AND ") + ")"
	}
}

var _ dbx.Expression = (*notContainsExpr)(nil)

type notContainsExpr struct {
	field *ResolverResult
	value *ResolverResult
}

func (e *notContainsExpr) Build(db *dbx.DB, params dbx.Params) string {
	driver := db.DriverName()

	switch driver {
	case "sqlite", "sqlite3":
		// For SQLite: NOT EXISTS (...)
		return fmt.Sprintf(
			"NOT EXISTS (SELECT 1 FROM json_each(%s) WHERE value = %s)",
			e.field.Identifier,
			e.value.Identifier,
		)
	case "postgres":
		// For PostgreSQL: NOT (field @> '[value]')
		return fmt.Sprintf(
			"NOT (%s @> %s)",
			e.field.Identifier,
			"("+e.value.Identifier+")",
		)
	case "mysql":
		// For MySQL: NOT JSON_CONTAINS(...)
		return fmt.Sprintf(
			"NOT JSON_CONTAINS(%s, JSON_QUOTE(%s))",
			e.field.Identifier,
			e.value.Identifier,
		)
	default:
		// Fallback - assume SQLite
		return fmt.Sprintf(
			"NOT EXISTS (SELECT 1 FROM json_each(%s) WHERE value = %s)",
			e.field.Identifier,
			e.value.Identifier,
		)
	}
}

var _ dbx.Expression = (*regexExpr)(nil)

type regexExpr struct {
	field   *ResolverResult
	pattern *ResolverResult
}

func (e *regexExpr) Build(db *dbx.DB, params dbx.Params) string {
	driver := db.DriverName()

	switch driver {
	case "sqlite", "sqlite3":
		// For SQLite: use REGEXP operator (requires sqlite3 with regexp extension)
		return fmt.Sprintf(
			"%s REGEXP %s",
			e.field.Identifier,
			e.pattern.Identifier,
		)
	case "postgres":
		// For PostgreSQL: ~ operator
		return fmt.Sprintf(
			"%s ~ %s",
			e.field.Identifier,
			e.pattern.Identifier,
		)
	case "mysql":
		// For MySQL: REGEXP operator
		return fmt.Sprintf(
			"%s REGEXP %s",
			e.field.Identifier,
			e.pattern.Identifier,
		)
	default:
		// Fallback - use LIKE for simple patterns (not a full regex)
		return fmt.Sprintf(
			"%s LIKE %s",
			e.field.Identifier,
			e.pattern.Identifier,
		)
	}
}

var _ dbx.Expression = (*lengthGtExpr)(nil)

type lengthGtExpr struct {
	field  *ResolverResult
	length *ResolverResult
}

func (e *lengthGtExpr) Build(db *dbx.DB, params dbx.Params) string {
	driver := db.DriverName()

	switch driver {
	case "sqlite", "sqlite3":
		// For SQLite: json_array_length(field) > ?
		return fmt.Sprintf(
			"json_array_length(%s) > %s",
			e.field.Identifier,
			e.length.Identifier,
		)
	case "postgres":
		// For PostgreSQL: jsonb_array_length(field) > ?
		return fmt.Sprintf(
			"jsonb_array_length(%s) > %s",
			e.field.Identifier,
			e.length.Identifier,
		)
	case "mysql":
		// For MySQL: JSON_LENGTH(field) > ?
		return fmt.Sprintf(
			"JSON_LENGTH(%s) > %s",
			e.field.Identifier,
			e.length.Identifier,
		)
	default:
		// Fallback - assume SQLite
		return fmt.Sprintf(
			"json_array_length(%s) > %s",
			e.field.Identifier,
			e.length.Identifier,
		)
	}
}

var _ dbx.Expression = (*lengthLtExpr)(nil)

type lengthLtExpr struct {
	field  *ResolverResult
	length *ResolverResult
}

func (e *lengthLtExpr) Build(db *dbx.DB, params dbx.Params) string {
	driver := db.DriverName()

	switch driver {
	case "sqlite", "sqlite3":
		// For SQLite: json_array_length(field) < ?
		return fmt.Sprintf(
			"json_array_length(%s) < %s",
			e.field.Identifier,
			e.length.Identifier,
		)
	case "postgres":
		// For PostgreSQL: jsonb_array_length(field) < ?
		return fmt.Sprintf(
			"jsonb_array_length(%s) < %s",
			e.field.Identifier,
			e.length.Identifier,
		)
	case "mysql":
		// For MySQL: JSON_LENGTH(field) < ?
		return fmt.Sprintf(
			"JSON_LENGTH(%s) < %s",
			e.field.Identifier,
			e.length.Identifier,
		)
	default:
		// Fallback - assume SQLite
		return fmt.Sprintf(
			"json_array_length(%s) < %s",
			e.field.Identifier,
			e.length.Identifier,
		)
	}
}
