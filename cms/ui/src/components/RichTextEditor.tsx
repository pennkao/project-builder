// src/components/RichTextEditor.jsx
import { useApi } from '@/hooks/useApi';
import { SRC } from '@/lib/image';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useState } from 'react';

const RichTextEditor = ({ uploadUrl, uploadDir, onChange, initData }: { uploadUrl: string; uploadDir: string; onChange?: (newContent: string) => void; initData?: string }) => {
    const [content, setContent] = useState(initData || '');
    const { api } = useApi();

    useEffect(() => {
        if (initData) {
            console.log('initData', initData);
            setContent(initData);
        }
    }, [initData]);
    const doUpload = async (file: File) => {
        if (uploadUrl.includes('cloud')) {
            return await doUploadToCloud(file);
        } else {
            return await doUploadToServer(file);
        }
    };
    const doUploadToCloud = async (file: File) => {
        if (!file) {
            return;
        }
        const dir = uploadDir;
        // 1️⃣ 构建请求数据
        const imagesArr: { file_name: string; dir: string; type: string }[] = [];
        let imagesFileArr: AwsImageUploadType[] = [];

        const mimeType = file?.type || 'image/png';
        const orgName = file?.name;

        imagesArr.push({
            file_name: orgName,
            dir,
            type: mimeType,
        });

        imagesFileArr.push({
            path: '',
            org_name: orgName,
            file_name: '',
            presign_url: '',
            file: file || null,
            mime_type: mimeType,
        });

        try {
            // 2️⃣ 请求后端生成 presign URL
            const res = await fetch(uploadUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(imagesArr),
            });

            if (!res.ok) {
                throw new Error(`Presign request failed: ${res.status}`);
            }

            const data = await res.json();
            if (data?.code !== 0 || !Array.isArray(data.data)) {
                throw new Error('Invalid presign response');
            }

            const toUploadImages = data.data as AwsImageResponseType[];

            // 3️⃣ 组装上传 & 保存数据
            const imagesUploaded: UploadResponseType[] = [];
            const imagesSave: SaveImageType[] = [];

            toUploadImages.forEach((img, idx) => {
                imagesUploaded.push({
                    id: idx,
                    file_name: img.org_name,
                    url: img.file_name,
                });

                if (!img.presign_url || !img.path || !img.file_name) return;

                const uploadItem = imagesFileArr[idx];
                uploadItem.path = img.path;
                uploadItem.presign_url = img.presign_url;
                uploadItem.file_name = img.file_name;

                imagesSave.push({
                    file_name: img.file_name,
                    mime_type: uploadItem.mime_type,
                    size: uploadItem.file?.size || 0,
                    width_px: 0, // 后续可补
                    height_px: 0, // 后续可补
                    platform: 1,
                    storage_path: 'local',
                });
            });

            // 4️⃣ 过滤掉无效 presign
            imagesFileArr = imagesFileArr.filter((item) => !!item.presign_url);

            // 5️⃣ 上传到云存储
            const uploadResults = await Promise.all(
                imagesFileArr.map((item) =>
                    fetch(item.presign_url, {
                        method: 'PUT',
                        body: item.file || new Blob([], { type: item.mime_type }),
                    })
                )
            );

            uploadResults.forEach((res) => {
                if (!res.ok) {
                    throw new Error(`Cloud upload failed: ${res.status}`);
                }
            });

            // 6️⃣ 保存数据库
            if (imagesSave.length) {
                await api.Post('file/save', imagesSave);
            }
            return SRC(imagesFileArr[0].file_name);
        } catch (err) {
            console.log(err);
        }
    };
    const doUploadToServer = async (file: File) => {
        if (!file) {
            return;
        }
        const form = new FormData();

        form.append('images[]', file);
        form.append('dir', uploadDir);
        try {
            const res = await fetch(uploadUrl, { method: 'POST', body: form });
            if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
            const data = await res.json(); // 假设 data.data 是数组
            if (!data || data.code !== 0 || !Array.isArray(data.data)) throw new Error('Invalid response format');
            if (!data || !data.data) throw new Error('Invalid response format');
            return SRC(data.data[0].url);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Editor
            tinymceScriptSrc="/plugins/tinymce/tinymce.js"
            value={content}
            onEditorChange={(newContent) => {
                setContent(newContent); // HTML
                if (onChange) {
                    onChange(newContent);
                }
                // console.log('HTML 内容:', newContent);

                // const plain = editor.getContent({ format: 'text' });
                // console.log('纯文本:', plain);
            }}
            init={{
                skin_url: '/plugins/tinymce/skins/ui/oxide',
                icons_url: '/plugins/tinymce/icons/default/icons.min.js',
                promotion: false,
                branding: false,
                height: 500,
                menubar: false,
                automatic_uploads: true, // 默认 true
                image_caption: true,
                image_title: true,
                toolbar_mode: 'wrap',
                plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount',
                toolbar: [
                    'undo redo media image code table link code preview emoticons charmap searchreplace  codesample  removeformat help visualblocks fullscreen',
                    'formatselect bold italic underline alignleft aligncenter alignright alignjustify  bullist numlist outdent indent ',
                ],

                images_upload_handler: async (blobInfo, progress) => {
                    const blob = blobInfo.blob();
                    const file = new File([blob], blobInfo.filename(), {
                        type: blob.type,
                        lastModified: Date.now(),
                    });
                    const url = await doUpload(file); // 自定义上传处理函数
                    if (progress) {
                        progress(0);
                    }
                    return url || '';
                },
            }}
        />
    );
};

export default RichTextEditor;
