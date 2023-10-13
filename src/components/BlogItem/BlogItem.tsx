// C'est le composant qui va combiner les 2 composants BlogImage et BlogText//
import BlogImage from '../BlogImage/BlogImage';
import BlogText from '../BlogText/BlogText';
import './BlogItem.css';

interface BlogItemProps {
  imgSrc: string;
  imgAlt: string;
  content: string;
  className?: string;
  title: string;
}

export function BlogItem({ imgSrc, imgAlt, content, title, className }: BlogItemProps) {
  return (
    <div className={`blog-item ${className ? className : ''}`}>
      <div className="image-container">
      <BlogImage src={imgSrc} alt={imgAlt} />
      </div>
      <div className="text-container">
        <h3>{title}</h3>
      <BlogText content={content} />
      
    </div>
    </div>
  );
}

export default BlogItem;
