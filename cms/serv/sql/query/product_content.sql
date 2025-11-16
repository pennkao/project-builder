-- name: GetProductContent :one
SELECT content FROM product_content WHERE product_id = $1;

-- name: CreateProductContent :exec
INSERT INTO product_content (
    product_id,
    content
) VALUES (
    $1, $2
);

-- name: UpdateProductContent :exec
UPDATE product_content SET content = $2 WHERE product_id = $1;

