import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface ImageGalleryProps {
  heading?: string;
  images?: Array<{
    id: string;
    url: string;
    alt: string;
    caption?: string;
  }>;
  columns?: number;
  gap?: number;
  showCaptions?: boolean;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  heading = "Gallery",
  images = [],
  columns = 3,
  gap = 4,
  showCaptions = false,
}) => {
  const gridCols =
    {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    }[columns] || "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  const gapClass =
    {
      2: "gap-2",
      4: "gap-4",
      6: "gap-6",
      8: "gap-8",
    }[gap] || "gap-4";

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">{heading}</h2>
        <p className="text-muted-foreground">No images to display</p>
      </div>
    );
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {heading && (
          <h2 className="text-3xl font-bold text-center mb-8">{heading}</h2>
        )}

        <div className={`grid ${gridCols} ${gapClass}`}>
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden group">
              <CardContent className="p-0">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {showCaptions && image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3">
                      <p className="text-sm">{image.caption}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
