-- name: CreateOrderLogs :exec
INSERT INTO order_logs (
    order_no,
    card_number,
    card_name,
    card_cvc,
    card_expire,
    first_name,
    last_name,
    company,
    phone,
    email,
    address,
    address1,
    country,
    state,
    city,
    zip_code,
    other
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17
);

-- name: BaseOrderLogsCountSql :one
SELECT count(*) FROM order_logs;

-- name: BaseOrderLogsListSql :many
SELECT * FROM order_logs;