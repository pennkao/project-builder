-- name: GetProductDetails :one
SELECT images, videos, specs FROM product_details WHERE product_id = $1;


-- name: CreateProductDetails :exec
INSERT INTO product_details (
    product_id,
    images,
    videos,
    specs
) VALUES (
    $1, $2, $3, $4
);

-- name: UpdateProductDetail :exec
UPDATE product_details SET images = $2, videos = $3, specs = $4 WHERE product_id = $1;

