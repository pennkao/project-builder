
-- name: UpdateProductSite :exec
UPDATE products SET sid = $2 WHERE sid = $1;