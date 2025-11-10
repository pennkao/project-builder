const baseUrl = 'http://localhost:5173';
const Image = ({ src, alt, className }: { src: string; alt?: string; className?: string }) => {
    if (!src) {
        return <div className={`${className} border border-dashed border-gray-300 bg-gray-200 `}></div>;
    }
    if (!src.startsWith('http')) {
        src = baseUrl + src;
    }
    return <img src={src} alt={alt} className={className} onLoad={() => console.log('图片加载完成')} />;
};
export default Image;
