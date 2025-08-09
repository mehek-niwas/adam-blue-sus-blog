import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BlogHeader } from "@/components/BlogHeader";
import { MarkdownEditor } from "@/components/MarkdownEditor";
import { BlogPostData } from "@/components/BlogPost";
import { Button } from "@/components/ui/button-enhanced";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('blog-posts') || '[]');
    const foundPost = posts.find((p: BlogPostData) => p.id === id);
    if (foundPost) {
      setPost({ ...foundPost, createdAt: new Date(foundPost.createdAt) });
    }
    setLoading(false);
  }, [id]);

  const handleSubmit = (updatedPost: { title: string; content: string; author: string }) => {
    if (!post) return;

    // Get existing posts from localStorage
    const existingPosts = JSON.parse(localStorage.getItem('blog-posts') || '[]');
    
    // Update the specific post
    const updatedPosts = existingPosts.map((p: BlogPostData) => {
      if (p.id === post.id) {
        return {
          ...p,
          title: updatedPost.title,
          content: updatedPost.content,
          author: updatedPost.author,
          excerpt: updatedPost.content.slice(0, 200) + (updatedPost.content.length > 200 ? '...' : ''),
        };
      }
      return p;
    });
    
    // Save updated posts
    localStorage.setItem('blog-posts', JSON.stringify(updatedPosts));
    
    // Navigate back to the post detail page
    navigate(`/post/${post.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <BlogHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          </div>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <BlogHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Post not found</h1>
            <Link to="/">
              <Button variant="outline-glow">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      <main>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Link to={`/post/${post.id}`}>
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Post
              </Button>
            </Link>
          </div>
        </div>
        <MarkdownEditor 
          onSubmit={handleSubmit}
          initialData={{
            title: post.title,
            content: post.content,
            author: post.author
          }}
          isEditing={true}
        />
      </main>
    </div>
  );
};

export default EditPost;
