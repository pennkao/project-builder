// src/components/RichTextEditor.jsx
import { SRC } from '@/lib/image';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useState } from 'react';

const RichTextEditor = ({ url, onChange, initData }: { url: string; onChange?: (newContent: string) => void; initData?: string }) => {
    const [content, setContent] = useState(initData || '');
    useEffect(() => {
        if (initData) {
            setContent(initData);
        }
    }, [initData]);
    const doUpload = async (file: File) => {
        if (!file) {
            return;
        }
        const form = new FormData();

        form.append('images[]', file);
        form.append('dir', 'images');
        try {
            const res = await fetch(url, { method: 'POST', body: form });
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
