-- name: ListProducts :many
SELECT  id,name, handle, tags, weight_g,deleted,status, brand, category, main_image_url, price,sales_count,cts
FROM products
ORDER BY id ASC
LIMIT $1 OFFSET $2;
-- name: GetProductCount :one
SELECT COUNT(*) FROM products;

-- name: GetProduct :one
SELECT * FROM products
WHERE id = $1 LIMIT 1;

-- name: CreateProduct :one
INSERT INTO products (
  name, handle, tags, weight_g, brand, category, main_image_url, price,sales_count
) VALUES (
  $1, $2, $3, $4, $5, $6, $7, $8, $9
)
RETURNING *;
      