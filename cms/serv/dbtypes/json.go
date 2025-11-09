// Package dbtype provides custom types for database fields.
package dbtypes

import (
	"database/sql/driver"
	"encoding/json"

	"github.com/bytedance/sonic"

	"errors"
)

// JSON represents a JSONB field in PostgreSQL.
// It wraps json.RawMessage to provide proper database and JSON marshaling.
type JSON json.RawMessage

// NewJSON creates a new JSON from any value that can be marshaled to JSON.
func NewJSON(v any) (JSON, error) {
	b, err := sonic.Marshal(v)
	if err != nil {
		return nil, err
	}
	return JSON(b), nil
}

// Value implements driver.Valuer interface for writing to the database.
// Returns the raw JSON bytes or nil if empty.
func (j JSON) Value() (driver.Value, error) {
	if len(j) == 0 || string(j) == "null" {
		return nil, nil
	}
	return []byte(j), nil
}

// Scan implements sql.Scanner interface for reading from the database.
// Accepts []byte, string, or nil.
func (j *JSON) Scan(value any) error {
	if value == nil {
		*j = nil
		return nil
	}

	switch v := value.(type) {
	case []byte:
		*j = JSON(v)
	case string:
		*j = JSON(v)
	default:
		return errors.New("failed to scan JSON value: unsupported type")
	}

	return nil
}

// MarshalJSON implements json.Marshaler.
// Returns raw JSON without extra quoting.
func (j JSON) MarshalJSON() ([]byte, error) {
	if j == nil {
		return []byte("null"), nil
	}
	if len(j) == 0 {
		return []byte("null"), nil
	}
	return json.RawMessage(j).MarshalJSON()
}

// UnmarshalJSON implements json.Unmarshaler.
// Parses JSON into the internal RawMessage.
func (j *JSON) UnmarshalJSON(data []byte) error {
	if j == nil {
		return errors.New("cannot unmarshal into nil JSON")
	}
	*j = JSON(data)
	return nil
}

// String returns the JSON as a string (for debugging).
func (j JSON) String() string {
	if j == nil {
		return "null"
	}
	return string(j)
}

// IsEmpty returns true if the JSON is nil or empty.
func (j JSON) IsEmpty() bool {
	return len(j) == 0 || string(j) == "null"
}

// Equals compares two JSON values by their byte representation.
func (j JSON) Equals(other JSON) bool {
	return string(j) == string(other)
}