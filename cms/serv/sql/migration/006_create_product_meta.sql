CREATE TABLE product_meta (
    product_id      BIGINT PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
    meta_title      TEXT,
    meta_description TEXT,
    keywords        TEXT,
    is_featured     BOOLEAN DEFAULT false,
    sort_priority   INTEGER DEFAULT 0,
    show_in_slider  BOOLEAN DEFAULT false,
    warranty_months INTEGER,
    origin_country  TEXT,
    weight_g        INTEGER,
    material        TEXT,
    shopify_id      TEXT,
    google_category TEXT,
    cts             BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT,
    uts             BIGINT DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::BIGINT
);