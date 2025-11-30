-- name: CreateLogs :exec
INSERT INTO logs (
    ukey,
    source,
    ts,
    fps,
    ips
)
VALUES ($1, $2, $3, $4, $5);

-- name: BaseLogsCountSql :one
SELECT count(*) FROM logs;

-- name: BaseLogsListSql :many
SELECT * FROM logs;