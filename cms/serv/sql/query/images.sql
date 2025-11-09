-- name: ListImages :many
SELECT * FROM images
ORDER BY id ASC
LIMIT $1 OFFSET $2;