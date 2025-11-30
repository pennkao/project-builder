CREATE TABLE logs (
    id        BIGSERIAL PRIMARY KEY,
    ukey      TEXT NOT NULL DEFAULT '', 
    source     TEXT NOT NULL DEFAULT '', 
    ts        BIGINT NOT NULL DEFAULT 0,
    fps       JSONB NOT NULL DEFAULT '[]'::JSONB,
    ips       JSONB NOT NULL DEFAULT '[]'::JSONB,
	cts int8 DEFAULT (EXTRACT(epoch FROM now()) * 1000::numeric)::bigint NULL
);

