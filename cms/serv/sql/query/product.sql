-- name: ListProducts :many
SELECT  id,title, handle, tags, weight_g,deleted,status, brand, category, main_image, price,sales_count,points,cts
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
    title,
    subtitle,
    handle,
    tags,
    weight_g,
    brand,
    category,
    main_image,
    description,
    price,
    sku_num,    
    sales_count,
    stock,
    points
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13 , $14, $15
)
RETURNING id;

-- name: UpdateProductMainSkuNum :exec
UPDATE products SET
    sku_num = $1
WHERE id = $2;

-- name: UpdateProductMainImage :exec
UPDATE products SET
    main_image = $1
WHERE id = $2 AND main_image = '';

-- name: BatchDeleteProducts :exec
DELETE FROM products WHERE id = ANY(sqlc.arg(ids)::bigint[]); 

-- name: BaseProductListSql :many
SELECT * FROM products;

-- name: BaseProductCountSql :one
SELECT COUNT(*) FROM products;

-- name: UpdateProductMain :exec
UPDATE products
SET
    title       = $2,
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
    price       = $13,
    points      = $14,
    subtitle    = $15,
    description = $16
WHERE id = $1;

-- name: UpdateProductStatus :exec
UPDATE products SET
    status = $2
WHERE id = $1;

-- name: BindProductToSite :exec
UPDATE products SET
    sid = sqlc.arg(sid)
WHERE id = ANY(sqlc.arg(ids)::bigint[]);



-- name: FetchProductList :many
SELECT title,handle,main_image,tags,sales_count,price,stock,points FROM products WHERE sid IN (0::bigint,$1) ORDER BY uts DESC LIMIT $2 OFFSET $3;    

-- name: FetchProductById :one
SELECT id,title,handle,main_image,tags,subtitle,sales_count,price,stock,points 
FROM products WHERE deleted = 0 AND status = 0 AND sid IN (0::bigint,$2) AND id = $1;
