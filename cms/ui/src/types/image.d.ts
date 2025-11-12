interface ImageItem {
    id: string;
    file: File;
    preview: string;
}

interface Image {
    id: number;
    url: string;
    storage_path: string;
    file_name: string;
    file_type: string;
    mime_type: string;
    alt_text: string;
    width_px: number;
    height_px: number;
}
