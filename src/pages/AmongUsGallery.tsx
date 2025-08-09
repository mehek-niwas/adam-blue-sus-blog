import React, { useState, useEffect, useRef } from 'react';
import { BlogHeader } from '@/components/BlogHeader';
import { SpinningAmong } from '@/components/SpinningAmong';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button-enhanced';
import { Upload, X, Download, Trash2 } from 'lucide-react';

interface GalleryImage {
  id: string;
  src: string;
  name: string;
  uploadDate: Date;
}

const AmongUsGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load images from localStorage on component mount
  useEffect(() => {
    const savedImages = JSON.parse(localStorage.getItem('amongus-gallery') || '[]');
    const imagesWithDates = savedImages.map((img: any) => ({
      ...img,
      uploadDate: new Date(img.uploadDate),
    }));
    setImages(imagesWithDates);
  }, []);

  // Save images to localStorage whenever images change
  useEffect(() => {
    localStorage.setItem('amongus-gallery', JSON.stringify(images));
  }, [images]);

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage: GalleryImage = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            src: e.target?.result as string,
            name: file.name,
            uploadDate: new Date(),
          };
          setImages((prev) => [newImage, ...prev]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e.target.files);
  };

  const deleteImage = (imageId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
    if (selectedImage === imageId) {
      setSelectedImage(null);
    }
  };

  const downloadImage = (image: GalleryImage) => {
    const link = document.createElement('a');
    link.href = image.src;
    link.download = image.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <SpinningAmong variant="blue" size="lg" />
              <h1 className="text-4xl font-bold text-glow">Among Us Gallery</h1>
              <SpinningAmong size="lg" />
            </div>
            <p className="text-muted-foreground">
              amongos collection
            </p>
          </div>

          {/* Upload Section */}
          <Card className="mb-8 glow-blue-soft">
            <CardContent className="p-8">
              <div
                className={`
                  border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300
                  ${dragOver 
                    ? 'border-primary bg-primary/10 glow-blue' 
                    : 'border-muted-foreground/30 hover:border-primary/50'
                  }
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2 text-white">
                  upload amongos
                </h3>
                <p className="text-muted-foreground mb-4">
                  click to browse your local files
                </p>
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  className="glow-blue-soft hover:glow-blue"
                >
                  Choose Files
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileInputChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* Gallery Grid */}
          {images.length === 0 ? (
            <Card className="text-center glow-blue-soft">
              <CardContent className="py-16">
                <div className="flex justify-center gap-4 mb-4">
                  <SpinningAmong size="md" />
                  <SpinningAmong variant="blue" size="md" />
                  <SpinningAmong size="md" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-white">No images yet</h2>
                <p className="text-muted-foreground">
                  Upload your first Among Us image to get started!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.map((image) => (
                <Card key={image.id} className="group overflow-hidden hover:glow-blue-soft transition-all duration-300">
                  <div className="relative">
                    <img
                      src={image.src}
                      alt={image.name}
                      className="w-full h-48 object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                      onClick={() => setSelectedImage(image.src)}
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadImage(image);
                        }}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteImage(image.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <p className="text-sm text-muted-foreground truncate">
                      {image.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {image.uploadDate.toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Image Modal */}
          {selectedImage && (
            <div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative max-w-4xl max-h-full">
                <img
                  src={selectedImage}
                  alt="Gallery Image"
                  className="max-w-full max-h-full object-contain"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-4 right-4"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AmongUsGallery;
