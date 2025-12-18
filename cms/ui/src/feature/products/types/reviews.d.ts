interface ProductReviewType {
    id: number;
    title: string;
    handle: string;
    main_image: string;
    rating: number;
    total: number;
    count: number;
    avg: number;
    status: number;
    cts: number;
}

interface CustomerReviewsType {
    id: number; // BIGSERIAL
    product_id: number; // BIGINT
    user_name: string; // TEXT
    user_avatar: string; // TEXT
    title: string; // TEXT
    content: string; // TEXT
    rating: number; // SMALLINT (0–5 一般)
    images: string[]; // TEXT[]
    sort: number; // SMALLINT
    status: number; // SMALLINT
    cts: number; // int8 毫秒时间戳
}
