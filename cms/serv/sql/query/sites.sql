-- name: SiteList :many
SELECT * FROM sites ORDER BY uts DESC;

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
    name = $1,
    stype = $2,
    site = $3,
    config = $4,
    domain = $5,
    uts = (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT
WHERE id = $6;

-- name: DeleteSite :exec
DELETE FROM sites WHERE id = $1;

-- name: FetchSite :one
SELECT site,config FROM sites WHERE id = $1;
