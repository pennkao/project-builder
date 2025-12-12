-- name: GetProductSkus :many
SELECT * FROM product_skus WHERE product_id = $1;


-- name: BatchCreateProductSkus :batchexec
INSERT INTO product_skus (
    product_id,
    title,
    code,
    image,
    price,
    stock,
    weight_g,
    status,
    stored,
    ukey,
    akey,
    attrs
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
);


-- name: BatchUpdateProductSkus :batchexec
UPDATE product_skus
SET
    title      = $1,
    code       = $2,
    image      = $3,
    price      = $4,
    stock      = $5,
    weight_g   = $6,
    status     = $7,
    uts        = $8 
WHERE product_id = $9 AND id = $10;

-- name: UpdateProductSkuStored :exec
UPDATE product_skus SET stored = 1 WHERE product_id = $1;

-- name: DeleteProductSku :exec
DELETE FROM product_skus WHERE product_id = $1 and id = ANY(sqlc.arg(ids)::bigint[]); 

-- name: FetchProductSkus :many
SELECT id,product_id,title,image,price,attrs,akey FROM product_skus WHERE product_id = $1;




