interface BlogImageProps {
    src: string;
    alt: string;
  }
  
  export function BlogImage({ src, alt }: BlogImageProps) {
    return (
      <img src={src} alt={alt} className="blog-image" />
    );
  }
  
  export default BlogImage;
  