import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Highlight from '@tiptap/extension-highlight';
import History from '@tiptap/extension-history';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
// import js from 'highlight.js/lib/languages/javascript';
// import ts from 'highlight.js/lib/languages/typescript';
import { lowlight } from 'lowlight/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';

// 注册语言
lowlight.registerLanguage('javascript', javascript);
lowlight.registerLanguage('typescript', typescript);


export default function ProductEditor({ onChange }: { onChange?: (html: string) => void }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({ openOnClick: false }),
            Image,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Table.configure({ resizable: true }),
            TableRow,
            TableCell,
            TaskList,
            TaskItem,
            Highlight,
            CodeBlockLowlight.configure({ lowlight }),
            History,
        ],
        content: '<p>请输入产品详情...</p>',
        onUpdate({ editor }) {
            onChange?.(editor.getHTML());
        },
    });

    const insertImage = () => {
        const url = prompt('输入图片 URL');
        if (url) editor?.chain().focus().setImage({ src: url }).run();
    };

    return (
        <div className="border rounded-lg p-4">
            {/* 工具栏 */}
            <div className="flex flex-wrap gap-2 mb-2">
                <button onClick={() => editor?.chain().focus().toggleBold().run()}>B</button>
                <button onClick={() => editor?.chain().focus().toggleItalic().run()}>I</button>
                <button onClick={() => editor?.chain().focus().toggleUnderline().run()}>U</button>
                <button onClick={() => editor?.chain().focus().toggleStrike().run()}>S</button>
                <button onClick={() => editor?.chain().focus().toggleHighlight().run()}>🌟</button>
                <button
                    onClick={() => {
                        const url = prompt('输入链接 URL');
                        if (url) editor?.chain().focus().setLink({ href: url }).run();
                    }}
                >
                    🔗
                </button>
                <button onClick={insertImage}>🖼️</button>
                <button onClick={() => editor?.chain().focus().toggleBulletList().run()}>• 列表</button>
                <button onClick={() => editor?.chain().focus().toggleOrderedList().run()}>1. 列表</button>
                <button onClick={() => editor?.chain().focus().toggleTaskList().run()}>☑️ 任务列表</button>
                <button onClick={() => editor?.chain().focus().setTextAlign('left').run()}>左对齐</button>
                <button onClick={() => editor?.chain().focus().setTextAlign('center').run()}>居中</button>
                <button onClick={() => editor?.chain().focus().setTextAlign('right').run()}>右对齐</button>
                <button onClick={() => editor?.chain().focus().undo().run()}>↩️ 撤销</button>
                <button onClick={() => editor?.chain().focus().redo().run()}>↪️ 重做</button>
                <button onClick={() => editor?.chain().focus().insertTable({ rows: 2, cols: 2, withHeaderRow: true }).run()}>表格</button>
                <button onClick={() => editor?.chain().focus().toggleCodeBlock().run()}>代码块</button>
            </div>

            {/* 编辑器内容 */}
            <EditorContent editor={editor} className="min-h-[300px] max-w-full p-2 border border-gray-200 rounded-md text-gray-800 dark:text-gray-100" />
        </div>
    );
}
