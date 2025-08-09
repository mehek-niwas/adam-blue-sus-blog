import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export interface BlogPostData {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  excerpt?: string;
}

interface BlogPostProps {
  post: BlogPostData;
  isPreview?: boolean;
}

export const BlogPost = ({ post, isPreview = false }: BlogPostProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  // Google Docs style for full post view
  if (!isPreview) {
    return (
      <div className="bg-card rounded-lg shadow-xl glow-blue-soft border border-border/50">
        {/* Document header */}
        <div className="border-b border-border/30 bg-gradient-to-r from-card to-card/80 rounded-t-lg">
          <div className="px-8 py-6">
            <h1 className="text-4xl font-bold text-glow mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Document content */}
        <div className="px-8 py-8 max-w-none">
          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ node, ...props }) => (
                  <img 
                    {...props} 
                    className="rounded-lg shadow-lg max-w-full h-auto my-6 glow-blue-soft border border-border/20" 
                    loading="lazy"
                  />
                ),
                code: ({ node, className, children, ...props }) => {
                  const isInline = !className;
                  return isInline ? (
                    <code className="bg-secondary px-2 py-1 rounded text-blue-glow font-mono text-sm border border-border/30" {...props}>
                      {children}
                    </code>
                  ) : (
                    <div className="my-6">
                      <pre className="bg-secondary border border-border/30 p-4 rounded-lg overflow-x-auto glow-blue-soft">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    </div>
                  );
                },
                blockquote: ({ children, ...props }) => (
                  <blockquote 
                    className="border-l-4 border-primary pl-6 py-4 my-6 italic bg-secondary/30 rounded-r-lg" 
                    {...props}
                  >
                    {children}
                  </blockquote>
                ),
                h1: ({ children, ...props }) => (
                  <h1 className="text-3xl font-bold mt-8 mb-4 text-glow border-b border-border/30 pb-2" {...props}>
                    {children}
                  </h1>
                ),
                h2: ({ children, ...props }) => (
                  <h2 className="text-2xl font-bold mt-6 mb-3 text-glow" {...props}>
                    {children}
                  </h2>
                ),
                h3: ({ children, ...props }) => (
                  <h3 className="text-xl font-semibold mt-5 mb-2 text-primary" {...props}>
                    {children}
                  </h3>
                ),
                p: ({ children, ...props }) => (
                  <p className="mb-4 leading-relaxed text-foreground/90" {...props}>
                    {children}
                  </p>
                ),
                ul: ({ children, ...props }) => (
                  <ul className="mb-4 ml-6 space-y-2" {...props}>
                    {children}
                  </ul>
                ),
                ol: ({ children, ...props }) => (
                  <ol className="mb-4 ml-6 space-y-2" {...props}>
                    {children}
                  </ol>
                ),
                li: ({ children, ...props }) => (
                  <li className="leading-relaxed" {...props}>
                    {children}
                  </li>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }

  // Preview card for home page
  return (
    <Card className="hover:glow-blue-soft transition-all duration-300 cursor-pointer">
      <CardHeader className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-glow hover:text-primary transition-colors">
            {post.title}
          </h2>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-invert max-w-none line-clamp-3">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.excerpt || post.content.slice(0, 200) + '...'}
          </ReactMarkdown>
        </div>
        <div className="mt-4 pt-4 border-t border-border">
          <Badge variant="secondary" className="text-primary">
            Read More →
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};