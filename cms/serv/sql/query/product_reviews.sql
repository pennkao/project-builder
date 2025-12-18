-- name: baseProductReviewsListSql :many
SELECT
    p.id,
    p.title,
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


-- name: baseCustomerReviewsListSql :many
SELECT
    *
FROM product_customer_reviews;

-- name: baseCustomerReviewsCountSql :one
SELECT
	count(*)
FROM product_customer_reviews;


-- name: BatchDeleteReviews :exec
DELETE FROM product_reviews WHERE id = ANY(sqlc.arg(ids)::bigint[]);

-- name: BatchDeleteCustomerReviews :exec
DELETE FROM product_customer_reviews WHERE id = ANY(sqlc.arg(ids)::bigint[]);

