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

  return (
    <Card className={`${isPreview ? 'hover:glow-blue-soft' : 'glow-blue-soft'} transition-all duration-300 cursor-pointer`}>
      <CardHeader className="space-y-4">
        <div className="space-y-2">
          <h2 className={`${isPreview ? 'text-xl' : 'text-3xl'} font-bold text-glow hover:text-primary transition-colors`}>
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
        <div className={`prose prose-invert max-w-none ${isPreview ? 'line-clamp-3' : ''}`}>
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({ node, ...props }) => (
                <img 
                  {...props} 
                  className="rounded-lg shadow-lg max-w-full h-auto glow-blue-soft" 
                  loading="lazy"
                />
              ),
              code: ({ node, className, children, ...props }) => {
                const isInline = !className;
                return isInline ? (
                  <code className="bg-muted px-1 py-0.5 rounded text-blue-glow font-mono text-sm" {...props}>
                    {children}
                  </code>
                ) : (
                  <code className={`${className} bg-muted p-4 rounded-lg block overflow-x-auto`} {...props}>
                    {children}
                  </code>
                );
              },
              blockquote: ({ children, ...props }) => (
                <blockquote 
                  className="border-l-4 border-primary pl-4 italic bg-muted/50 py-2 rounded-r-lg" 
                  {...props}
                >
                  {children}
                </blockquote>
              ),
            }}
          >
            {isPreview ? (post.excerpt || post.content.slice(0, 200) + '...') : post.content}
          </ReactMarkdown>
        </div>
        {isPreview && (
          <div className="mt-4 pt-4 border-t border-border">
            <Badge variant="secondary" className="text-primary">
              Read More →
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};