-- name: ListProducts :many
SELECT  id,name, handle, tags, weight_g,deleted,status, brand, category, main_image_url, price,sales_count,cts
FROM products
ORDER BY id asc
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
    main_image_url,
    price,
    sku_num,
    sales_count,
    stock
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
)
RETURNING id;

-- name: CreateProductOptions :exec
INSERT INTO product_options (
    product_id,
    options
) VALUES (
    $1, $2
);

-- name: CreateProductSku :exec
INSERT INTO product_skus (
    product_id,
    name,
    img,
    price,
    stock,
    weight_g,
    attrs,
    status
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8
);

-- name: CreateProductSkuJson :exec
INSERT INTO product_sku_json (
    product_id,
    skus
) VALUES (
    $1, $2
);

-- name: CreateProductDetails :exec
INSERT INTO product_details (
    product_id,
    images,
    videos,
    specs
) VALUES (
    $1, $2, $3, $4
);

-- name: CreateProductContent :exec
INSERT INTO product_content (
    product_id,
    content
) VALUES (
    $1, $2
);

-- name: UpdateProductMainSkuNum :exec
UPDATE products SET
    sku_num = $1
WHERE id = $2;

-- name: UpdateProductMainImage :exec
UPDATE products SET
    main_image_url = $1
WHERE id = $2;
