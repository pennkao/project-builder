const Image = ({ src, alt, className, onClick }: { src: string; alt?: string; className?: string; onClick?: () => void }) => {
    if (!src) {
        return <div className={`${className} border border-dashed border-gray-300 bg-gray-200 `}></div>;
    }

    return <img src={src} alt={alt} className={className} onClick={onClick} />;
};
export default Image;
