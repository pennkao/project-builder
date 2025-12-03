-- name: SiteList :many
SELECT * FROM sites;

-- name: GetSite :one
SELECT * FROM sites WHERE id = $1;

-- name: CreateSite :exec
INSERT INTO sites (
    id,
    name,
    domain,
    stype,
    site,
    config
)
VALUES ($1, $2, $3, $4, $5, $6);

-- name: UpdateSite :exec
UPDATE sites SET
    name = $2,
    domain = $3,
    stype = $4,
    site = $5,
    config = $6,
    uts = (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT
WHERE id = $1;

-- name: DeleteSite :exec
DELETE FROM sites WHERE id = $1;