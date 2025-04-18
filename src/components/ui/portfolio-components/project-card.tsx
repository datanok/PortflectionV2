import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  tags?: string[];
  className?: string;
}

export function ProjectCard({ title, description, image, url, tags, className }: ProjectCardProps) {
  return (
    <Card className={`overflow-hidden ${className}`}>
      {image && (
        <div className="relative h-48 w-full">
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <Image 
              src={image || "/api/placeholder/400/320"} 
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">{description}</CardDescription>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      {url && (
        <CardFooter>
          <Link 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-primary flex items-center hover:underline"
          >
            View Project <ExternalLink className="ml-1 h-3 w-3" />
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}