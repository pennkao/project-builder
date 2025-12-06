-- name: SiteList :many
SELECT * FROM sites ORDER BY uts DESC;

-- name: GetSite :one
SELECT * FROM sites WHERE id = $1;

-- name: CreateSite :exec
INSERT INTO sites (
    sid,
    name,
    domain,
    stype,
    site,
    config
)
VALUES ($1, $2, $3, $4, $5, $6);

-- name: UpdateSite :exec
UPDATE sites SET
    sid = $1,
    name = $2,
    domain = $3,
    stype = $4,
    site = $5,
    config = $6,
    uts = (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT
WHERE id = $7;

-- name: DeleteSite :exec
DELETE FROM sites WHERE id = $1;

-- name: FetchSite :one
SELECT site,config FROM sites WHERE sid = $1;
