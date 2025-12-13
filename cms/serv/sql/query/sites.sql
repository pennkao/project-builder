-- name: SiteList :many
SELECT * FROM sites ORDER BY uts DESC;

-- name: GetSite :one
SELECT * FROM sites WHERE id = $1;

-- name: CreateSite :exec
INSERT INTO sites (
    id,
    name,
    image,
    description,
    domain,
    stype,
    meta,
    config
)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8);

-- name: UpdateSite :exec
UPDATE sites SET
    name = $1,
    image = $2,
    description = $3,
    stype = $4,
    meta = $5,
    config = $6,
    domain = $7,
    uts = (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT
WHERE id = $8;  

-- name: BatchDeleteSites :exec
DELETE FROM sites WHERE id = ANY(sqlc.arg(ids)::bigint[]); 

-- name: SwitchSiteStatus :exec
UPDATE sites SET
    status = $1,
    uts = (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT
WHERE id = $2;  

-- name: FetchSite :one
SELECT name,domain,image,description,meta,config FROM sites WHERE id = $1;

-- name: GetDomains :many
SELECT id,domain FROM sites WHERE status = 0;