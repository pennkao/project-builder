-- name: baseProductReviewsListSql :many
SELECT
    p.id,
    p.name,
    p.handle,
    p.main_image,
    r.rating,
    r.total,
    r.count,
    r.avg,
    r.status,
    r.cts
FROM products p
LEFT JOIN product_reviews r
    ON r.product_id = p.id;

-- name: baseProductReviewsCountSql :one
SELECT
	count(*)
FROM products as p;