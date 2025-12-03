
const ImageView = ({ src, onClick }: { src: string; onClick?: () => void }) => {
    console.log(src);
    if (!src) {
        return null;
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-9999" onClick={onClick}>
            <img src={src} className="max-w-[90%] max-h-[90%] rounded-lg" />
        </div>
    );
};

export default ImageView;
