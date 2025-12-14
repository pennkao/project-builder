



-- name: BasePageListSql :many
SELECT id, title, handle, subtitle, sid, description, stype, image, status, visibility, seo, meta,cts FROM pages;

-- name: BasePageCountSql :one
SELECT COUNT(*) FROM pages;


-- name: CreatePage :exec
INSERT INTO pages (
    id, title, handle, subtitle, description, stype, content, image, seo, meta, visibility
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11    
);
-- name: UpdatePage :exec
UPDATE pages SET
    title = $2, subtitle = $3, description = $4, stype = $5, content = $6, image = $7, visibility = $8, seo = $9, meta = $10
WHERE id = $1;

-- name: GetPage :one
SELECT id, title, handle, subtitle, description, stype, content, image, visibility, seo, meta, uts FROM pages WHERE id = $1;

-- name: SwitchPageStatus :exec
UPDATE pages SET
    status = $1,
    uts = (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT
WHERE id = $2;  

-- name: SwitchPageVisibility :exec
UPDATE pages SET
    visibility = $1,
    uts = (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT
WHERE id = $2;  


-- name: FetchPage :one
SELECT title, handle, subtitle, description, content, image, seo, meta 
FROM pages WHERE sid IN (0, $2) AND status=0 AND visibility=0 AND id = $1;

-- name: BatchDeletePages :exec
DELETE FROM pages WHERE id = ANY(sqlc.arg(ids)::bigint[]); 
