-- name: GetProductSkus :many
SELECT * FROM product_skus WHERE product_id = $1;

-- name: CreateProductSku :exec
INSERT INTO product_skus (
    product_id,
    name,
    image,
    price,
    stock,
    weight_g,
    attrs,
    status
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8
);