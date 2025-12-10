// components/RichTextViewer.tsx


export default function RichTextViewer({ htmlContent, className = '' }: RichTextViewerProps) {
    return <div className={`rich-text-container  break-words ${className}`} dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
