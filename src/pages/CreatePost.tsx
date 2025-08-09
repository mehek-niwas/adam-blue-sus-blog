import { BlogHeader } from "@/components/BlogHeader";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { useNavigate } from "react-router-dom";
import { BlogPostData } from "@/components/BlogPost";

const CreatePost = () => {
  const navigate = useNavigate();

  const handleSubmit = (post: { title: string; content: string; author: string }) => {
    // Get existing posts from localStorage
    const existingPosts = JSON.parse(localStorage.getItem('blog-posts') || '[]');
    
    // Create new post
    const newPost: BlogPostData = {
      id: Date.now().toString(),
      title: post.title,
      content: post.content,
      author: post.author,
      createdAt: new Date(),
      excerpt: post.content.slice(0, 200) + (post.content.length > 200 ? '...' : ''),
    };
    
    // Add to posts and save
    const updatedPosts = [newPost, ...existingPosts];
    localStorage.setItem('blog-posts', JSON.stringify(updatedPosts));
    
    // Navigate back to home
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      <main>
        <MarkdownEditor onSubmit={handleSubmit} />
      </main>
    </div>
  );
};

export default CreatePost;