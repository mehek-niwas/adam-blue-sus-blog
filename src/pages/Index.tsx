import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BlogHeader } from "@/components/BlogHeader";
import { BlogPost, BlogPostData } from "@/components/BlogPost";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button-enhanced";
import { FileText, Edit } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Index = () => {
  const [posts, setPosts] = useState<BlogPostData[]>([]);
  const [introContent, setIntroContent] = useState<string>("");

  const defaultIntroContent = `i started working for meta fresh out of college, and i recently became a tl! along the way, i picked up many things that i like to share when friends ask for advice.

this website is to share those thoughts :D (my friend forced me to stop sharing random google docs)

i put in a lot of care and research for many of my posts, but things might be different for you !! think of what you read here as one perspective, not the final word.`;

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('blog-posts') || '[]');
    const postsWithDates = savedPosts.map((post: any) => ({
      ...post,
      createdAt: new Date(post.createdAt),
    }));
    setPosts(postsWithDates);

    // Load introduction content
    const savedIntro = localStorage.getItem('blog-intro');
    setIntroContent(savedIntro || defaultIntroContent);
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
              <div className="flex items-center justify-center gap-4 mb-6">
                <h2 className="text-3xl font-bold text-glow">hello! i am adam</h2>
                <Link to="/edit-intro">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                </Link>
              </div>
              <div className="max-w-2xl mx-auto">
                <div className="prose prose-invert max-w-none text-muted-foreground">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {introContent}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
            
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 text-white">latest posts</h1>
              <p className="text-muted-foreground">my thoughts about stuff and things</p>
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
