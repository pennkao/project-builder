-- name: CreateLogs :exec
INSERT INTO logs (
    sid,
    ukey,   
    source,
    ts,
    domain,
    fps,
    ips
)
VALUES ($1, $2, $3, $4, $5, $6, $7);

-- name: BaseLogsCountSql :one
SELECT count(*) FROM logs;

-- name: BaseLogsListSql :many
SELECT * FROM logs;

-- name: BatchDeleteLogs :exec
DELETE FROM logs WHERE id = ANY(sqlc.arg(ids)::bigint[]);
