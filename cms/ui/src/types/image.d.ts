interface ImageItemType {
    id: string;
    file: File | null;
    url: string;
    preview: string;
}

interface ImageType {
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

type UploadSelectType = 'single' | 'multiple';