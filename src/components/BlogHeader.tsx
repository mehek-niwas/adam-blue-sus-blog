import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button-enhanced";
import { PlusCircle, Images } from "lucide-react";
import amongUsIcon from "@/assets/amongus-blue.png";

export const BlogHeader = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img 
              src={amongUsIcon} 
              alt="Among Us Character" 
              className="w-10 h-10 rounded-lg glow-blue-soft"
            />
            <div>
              <h1 className="text-2xl font-bold text-glow">
                blogs by adam the meta guy
              </h1>
              <p className="text-sm text-muted-foreground">my thoughts about stuff and things</p>
            </div>
          </Link>
          
          <nav className="flex items-center gap-4">
            <Link to="/gallery">
              <Button variant="outline" className="gap-2 glow-blue-soft hover:glow-blue">
                <Images className="w-4 h-4" />
                Gallery
              </Button>
            </Link>
            <Link to="/create">
              <Button variant="glow" className="gap-2">
                <PlusCircle className="w-4 h-4" />
                New Post
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};