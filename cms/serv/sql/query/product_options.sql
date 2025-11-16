-- name: GetProductOptions :one
SELECT options FROM product_options WHERE product_id = $1;

-- name: CreateProductOptions :exec
INSERT INTO product_options (
    product_id,
    options
) VALUES (
    $1, $2
);

-- name: UpdateProductOptions :exec
UPDATE product_options
SET
    options = $2
WHERE product_id = $1;
