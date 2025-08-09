import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BlogHeader } from "@/components/BlogHeader";
import { BlogPost, BlogPostData } from "@/components/BlogPost";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

const Index = () => {
  const [posts, setPosts] = useState<BlogPostData[]>([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('blog-posts') || '[]');
    const postsWithDates = savedPosts.map((post: any) => ({
      ...post,
      createdAt: new Date(post.createdAt),
    }));
    setPosts(postsWithDates);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      <main className="container mx-auto px-4 py-8">
        {posts.length === 0 ? (
          <Card className="max-w-2xl mx-auto text-center glow-blue-soft">
            <CardContent className="py-16">
              <FileText className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold mb-2 text-white">No posts yet</h2>
              <p className="text-muted-foreground mb-6">
                Start creating your first blog post to share your thoughts with the world.
              </p>
              <Link to="/create" className="inline-block">
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-blue-soft hover:glow-blue transition-all duration-300 px-6 py-3 rounded-lg font-medium">
                  Create Your First Post
                </button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Introduction Section */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6 text-glow">Meet Adam the Meta Guy</h2>
              <div className="max-w-2xl mx-auto space-y-4">
                <p className="text-muted-foreground">
                  Welcome to my corner of the meta verse! I'm Adam, and I spend my time exploring the fascinating 
                  intersection of technology, philosophy, and the ever-evolving digital landscape that shapes our reality.
                </p>
                <p className="text-muted-foreground">
                  From diving deep into emerging tech trends to questioning the nature of our increasingly connected world, 
                  I share thoughts, insights, and discoveries that might just change how you see the digital realm around us.
                </p>
                <p className="text-muted-foreground">
                  Join me as we navigate the meta layers of existence, one post at a time. 🚀
                </p>
              </div>
            </div>
            
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 text-white">Latest Posts</h1>
              <p className="text-muted-foreground">Explore Adam's thoughts from the meta verse</p>
            </div>
            
            <div className="grid gap-8">
              {posts.map((post) => (
                <Link key={post.id} to={`/post/${post.id}`}>
                  <BlogPost post={post} isPreview={true} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
