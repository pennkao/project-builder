// Banner.tsx
import imgUrl from "@/assets/images/banner1.jpeg";

// Banner.tsx
const Banner = ({ className }: { className?: string }) => {
  return (
    <section className={`relative w-full ${className}`}>
      {/* 占位元素：高度 = 宽度 * (高度/宽度) */}
      <div className="pb-[31.25%]"> {/* 16:5 → 5/16 = 31.25% */}
        <img
          src={imgUrl}
          alt="banner"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default Banner;