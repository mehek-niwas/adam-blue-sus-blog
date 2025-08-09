import { useState } from "react";
import { Button } from "@/components/ui/button-enhanced";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, Eye, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownEditorProps {
  onSubmit: (post: { title: string; content: string; author: string }) => void;
  initialData?: {
    title: string;
    content: string;
    author: string;
  };
  isEditing?: boolean;
}

export const MarkdownEditor = ({ onSubmit, initialData, isEditing = false }: MarkdownEditorProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [author, setAuthor] = useState(initialData?.author || "Adam the Meta Guy");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/markdown") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        // Extract title from first heading if exists
        const titleMatch = text.match(/^#\s+(.+)$/m);
        if (titleMatch) {
          setTitle(titleMatch[1]);
          // Remove the title from content
          setContent(text.replace(/^#\s+(.+)$/m, '').trim());
        } else {
          setContent(text);
        }
        toast({
          title: "File uploaded successfully",
          description: "Markdown file has been loaded into the editor.",
        });
      };
      reader.readAsText(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a .md or .markdown file.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in both title and content.",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
    });

    // Reset form only if not editing
    if (!isEditing) {
      setTitle("");
      setContent("");
    }
    
    toast({
      title: isEditing ? "Post updated!" : "Post published!",
      description: isEditing ? "Your blog post has been successfully updated." : "Your blog post has been successfully published.",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card className="glow-blue-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <FileText className="w-5 h-5" />
{isEditing ? "Edit Blog Post" : "Create New Blog Post"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Post Title</Label>
              <Input
                id="title"
                placeholder="Enter your blog post title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-muted border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="bg-muted border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Upload Markdown File (Optional)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="file"
                type="file"
                accept=".md,.markdown"
                onChange={handleFileUpload}
                className="bg-muted border-border file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-3 file:py-1"
              />
              <Button variant="outline-glow" size="sm">
                <Upload className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Tabs defaultValue="write" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-muted">
              <TabsTrigger value="write" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Write
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="write" className="mt-4">
              <Textarea
                placeholder="Write your blog post in Markdown...

## Example
You can use **bold**, *italic*, and `code` formatting.

### Lists work too:
- Item 1
- Item 2
- Item 3

![Alt text for images](https://via.placeholder.com/400x200)

```javascript
console.log('Code blocks are supported!');
```"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[400px] bg-muted border-border resize-none font-mono text-sm"
              />
            </TabsContent>
            
            <TabsContent value="preview" className="mt-4">
              <Card className="min-h-[400px] bg-muted border-border">
                <CardContent className="p-6">
                  {content ? (
                    <div className="prose prose-invert max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-muted-foreground italic">
                      Preview will appear here as you type...
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end">
            <Button variant="glow" onClick={handleSubmit} className="gap-2">
              <Send className="w-4 h-4" />
{isEditing ? "Update Post" : "Publish Post"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};