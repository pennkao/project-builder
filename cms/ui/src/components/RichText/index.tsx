import { useEffect, useRef } from "react";

declare global {
  interface Window {
    ClassicEditor: any;
  }
}

export default function ProductEditor() {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    const initEditor = async () => {
      if (!window.ClassicEditor) return;

      const el = document.querySelector("#editor");
      if (!el) return;

      const editor = await window.ClassicEditor.create(el, {
        toolbar: [
          "undo",
          "redo",
          "|",
          "heading",
          "|",
          "fontFamily",
          "fontSize",
          "fontColor",
          "fontBackgroundColor",
          "|",
          "bold",
          "italic",
          "underline",
          "|",
          "link",
          "bulletedList",
          "numberedList",
          "|",
          "insertTable",
          "blockQuote",
          "|",
          "alignment",
          "removeFormat",
        ],
        language: "zh-cn",
      });

      editorRef.current = editor;
    };

    initEditor();

    return () => {
      if (editorRef.current) editorRef.current.destroy();
    };
  }, []);

  return (
    <div style={{ padding: "1rem", maxWidth: "900px", margin: "0 auto" }}>
      <div id="editor" style={{ minHeight: 400 }}>
        <h1>产品详情</h1>
        <p>在这里输入商品描述...</p>
      </div>
    </div>
  );
}
