-- name: CreateProductSkuJson :exec
INSERT INTO product_sku_json (
    product_id,
    skus
) VALUES (
    $1, $2
);

-- name: UpdateProductSkuJson :exec
UPDATE product_sku_json SET skus = $2 WHERE product_id = $1;

