interface BlogTextProps {
    content: string;
    title?:string;
  }
  
  export function BlogText({ content }: BlogTextProps) {
    return (
      <p className="blog-text">{content}</p>
    );
  }
  
  export default BlogText;
  