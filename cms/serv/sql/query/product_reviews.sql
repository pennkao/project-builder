-- name: baseProductReviewsListSql :many
SELECT
    p.id,
    p.name,
    p.handle,
    p.main_image,
    c.rating,
    c.total,
    c.count,
    c.avg,
    c.status,
    c.cts
FROM products p
JOIN product_reviews c 
    ON c.product_id = p.id;

-- name: baseProductReviewsCountSql :one
SELECT
	count(*)
FROM products p
JOIN product_reviews c 
    ON c.product_id = p.id;