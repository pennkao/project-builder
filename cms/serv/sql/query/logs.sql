-- name: CreateLog :exec
INSERT INTO logs (
    ukey,
    source,
    ts,
    fps,
    ips
)
VALUES ($1, $2, $3, $4, $5);
