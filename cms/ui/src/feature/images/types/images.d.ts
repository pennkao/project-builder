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

// 上传状态
type ImageStatusType = 'local' | 'upLoading' | 'upLoaded';

// 核心图片类型
interface ImageItemType {
    id: string; // 唯一标识
    fileName?: string; // 文件名
    status: ImageStatusType; // 上传状态
    url?: string; // 网络图片地址（上传后）
    preview?: string; // 预览图（本地 file 创建的 ObjectURL 或网络缩略图）
    file?: File | null; // 本地文件（File对象），网络图片可以不填
    fileType?: string; // 文件类型，如 image/png
}

interface UploadResponseType {
    id: number;
    file_name: string;
    url: string;
}

interface SkuSeletedImageType {
    index: number;
    image: string;
}

type UploadSelectType = 'single' | 'multiple';

interface ImageTargetType {
    target: 'sku_image' | 'product_image' | 'category_image' | 'attr_image' | 'attr_value_image' | '';
    limit: null | number; //数量限制
    index?: number;
    selector?: Record<string, string>;
}

interface ImageChannelType {
    target?: 'sku_image' | 'product_image' | 'category_image' | 'attr_image' | 'attr_value_image' | '';
    index?: number;
    selector?: Record<string, string>;
    images: string[];
}
