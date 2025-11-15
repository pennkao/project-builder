-- name: ListProducts :many
SELECT  id,name, handle, tags, weight_g,deleted,status, brand, category, main_image, price,sales_count,cts
FROM products
WHERE deleted = 0
ORDER BY uts desc
LIMIT $1 OFFSET $2;
-- name: GetProductCount :one
SELECT COUNT(*) FROM products;

-- name: GetProductHandleCheck :one
SELECT COUNT(*) FROM products WHERE handle = $1;

-- name: GetProductHandleCount :one
SELECT COUNT(*) FROM products WHERE handle LIKE $1 || '%';

-- name: GetProduct :one
SELECT * FROM products WHERE id = $1;

-- name: CreateProductMain :one
INSERT INTO products (
    id,
    name,
    handle,
    tags,
    weight_g,
    brand,
    category,
    main_image,
    price,
    sku_num,
    sales_count,
    stock
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
)
RETURNING id;

-- name: CreateProductSkuJson :exec
INSERT INTO product_sku_json (
    product_id,
    skus
) VALUES (
    $1, $2
);


-- name: UpdateProductMainSkuNum :exec
UPDATE products SET
    sku_num = $1
WHERE id = $2;

-- name: UpdateProductMainImage :exec
UPDATE products SET
    main_image = $1
WHERE id = $2;

-- name: DeleteProduct :exec
DELETE FROM products WHERE id = $1;


