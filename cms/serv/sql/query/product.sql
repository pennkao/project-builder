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


-- name: BatchDeleteProducts :batchexec
DELETE FROM products WHERE id = $1;


-- name: BaseProductListSql :many
SELECT * FROM products;

-- name: BaseProductCountSql :one
SELECT COUNT(*) FROM products;

-- name: UpdateProductMain :exec
UPDATE products
SET
    name        = $2,
    tags        = $3,
    status      = $4,
    deleted     = $5,
    sku_num     = $6,
    weight_g    = $7,
    brand       = $8,
    category    = $9,
    main_image  = $10,
    sales_count = $11,
    stock       = $12,
    price       = $13
WHERE id = $1;

-- name: UpdateProductStatus :exec
UPDATE products SET
    status = $2
WHERE id = $1;


-- name: FetchProductList :many
SELECT name,handle,main_image,tags,sales_count,price,stock FROM products ORDER BY uts DESC LIMIT $1 OFFSET $2;

-- name: FetchProductById :one
SELECT id,name,handle,main_image,tags,sales_count,price,stock FROM products WHERE id = $1;
