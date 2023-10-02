// C'est le composant qui va combiner les 2 composants BlogImage et BlogText//
import BlogImage from '../BlogImage/BlogImage';
import BlogText from '../BlogText/BlogText';

interface BlogItemProps {
  imgSrc: string;
  imgAlt: string;
  content: string;
  title?: string;
}

export function BlogItem({ imgSrc, imgAlt, content }: BlogItemProps) {
  return (
    <div className="blog-item">
      <BlogImage src={imgSrc} alt={imgAlt} />
      <BlogText content={content} />
    </div>
  );
}

export default BlogItem;
