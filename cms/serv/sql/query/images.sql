-- name: ListImages :many
SELECT * FROM images
ORDER BY id ASC
LIMIT $1 OFFSET $2;

-- name: BaseImageListSql :many
SELECT * FROM images;

-- name: BaseImageCountSql :one
SELECT COUNT(*) FROM images;
