-- name: ListImages :many
SELECT * FROM images
ORDER BY cts DESC
LIMIT $1 OFFSET $2;

-- name: BaseImageListSql :many
SELECT 
    id,
    CASE 
        WHEN url = '' THEN file_name  ELSE url 
    END AS url,
    storage_path,
    file_name,
    file_type,
    mime_type,
    alt_text,
    width_px,
    height_px,
    cts
FROM images;

-- name: BaseImageCountSql :one
SELECT COUNT(*) FROM images;

-- name: BatchCreateImages :batchexec
INSERT INTO images (
    storage_path,
    file_name,
    file_type,
    mime_type,
    height_px,
    width_px
)
VALUES ($1, $2, $3, $4, $5, $6);

-- name: BatchDeleteImages :exec
DELETE FROM images WHERE id = ANY(sqlc.arg(ids)::bigint[]); 
