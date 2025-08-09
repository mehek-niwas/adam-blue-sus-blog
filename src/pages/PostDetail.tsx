import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BlogHeader } from "@/components/BlogHeader";
import { BlogPost, BlogPostData } from "@/components/BlogPost";
import { Button } from "@/components/ui/button-enhanced";
import { ArrowLeft, Edit } from "lucide-react";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('blog-posts') || '[]');
    const foundPost = posts.find((p: BlogPostData) => p.id === id);
    if (foundPost) {
      setPost({ ...foundPost, createdAt: new Date(foundPost.createdAt) });
    }
  }, [id]);

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
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <Link to="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <Link to={`/edit/${post.id}`}>
            <Button variant="glow" className="gap-2">
              <Edit className="w-4 h-4" />
              Edit Post
            </Button>
          </Link>
        </div>
        
        {/* Google Docs style container */}
        <div className="max-w-4xl mx-auto bg-background">
          <div className="min-h-[calc(100vh-200px)] py-8">
            <BlogPost post={post} isPreview={false} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostDetail;