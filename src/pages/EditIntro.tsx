import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BlogHeader } from "@/components/BlogHeader";
import { Button } from "@/components/ui/button-enhanced";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FileText, Eye, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const EditIntro = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const defaultIntroContent = `i started working for meta fresh out of college, and i recently became a tl! along the way, i picked up many things that i like to share when friends ask for advice.

this website is to share those thoughts :D (my friend forced me to stop sharing random google docs)

i put in a lot of care and research for many of my posts, but things might be different for you !! think of what you read here as one perspective, not the final word.`;

  useEffect(() => {
    // Load existing introduction content
    const savedIntro = localStorage.getItem('blog-intro');
    setContent(savedIntro || defaultIntroContent);
  }, []);

  const handleSave = () => {
    if (!content.trim()) {
      toast({
        title: "Content required",
        description: "Please add some content for the introduction.",
        variant: "destructive",
      });
      return;
    }

    // Save to localStorage
    localStorage.setItem('blog-intro', content.trim());
    
    toast({
      title: "Introduction updated!",
      description: "Your introduction has been successfully updated.",
    });

    // Navigate back to home
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      <main>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto p-6 space-y-6">
          <Card className="glow-blue-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <FileText className="w-5 h-5" />
                Edit Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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
                    placeholder="Write your introduction in Markdown...

## Example
You can use **bold**, *italic*, and `code` formatting.

### Lists work too:
- Item 1  
- Item 2
- Item 3

[Links are supported](https://example.com)

> Blockquotes work great for emphasis!"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[400px] bg-muted border-border resize-none font-mono text-sm"
                  />
                </TabsContent>
                
                <TabsContent value="preview" className="mt-4">
                  <Card className="min-h-[400px] bg-muted border-border">
                    <CardContent className="p-6">
                      {content ? (
                        <div className="prose prose-invert max-w-none text-muted-foreground">
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
                <Button variant="glow" onClick={handleSave} className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Introduction
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default EditIntro;
