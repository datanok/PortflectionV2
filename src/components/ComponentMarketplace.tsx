"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Star,
  Download,
  Eye,
  Heart,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface CommunityComponent {
  id: string;
  name: string;
  description: string;
  author: {
    name: string;
    avatar: string;
    github: string;
  };
  category: string;
  tags: string[];
  thumbnail: string;
  downloads: number;
  rating: number;
  reviews: number;
  lastUpdated: string;
  version: string;
  isInstalled: boolean;
  isPremium: boolean;
  price?: number;
  demoUrl?: string;
  documentationUrl?: string;
  githubUrl?: string;
  compatibility: string[];
  dependencies: string[];
}

const mockComponents: CommunityComponent[] = [
  {
    id: "animated-hero",
    name: "Animated Hero Section",
    description:
      "A stunning hero section with smooth animations, particle effects, and interactive elements perfect for modern portfolios.",
    author: {
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      github: "sarahchen",
    },
    category: "hero",
    tags: ["animation", "particles", "interactive", "modern"],
    thumbnail: "/thumbnails/animated-hero.jpg",
    downloads: 1247,
    rating: 4.8,
    reviews: 89,
    lastUpdated: "2024-01-15",
    version: "1.2.0",
    isInstalled: false,
    isPremium: false,
    demoUrl: "https://demo.portflection.com/animated-hero",
    documentationUrl: "https://docs.portflection.com/components/animated-hero",
    githubUrl: "https://github.com/sarahchen/animated-hero",
    compatibility: ["React 18+", "Next.js 13+", "TypeScript"],
    dependencies: ["framer-motion", "react-particles"],
  },
  {
    id: "dark-mode-toggle",
    name: "Dark Mode Toggle",
    description:
      "Elegant dark mode toggle with smooth transitions and system preference detection.",
    author: {
      name: "Alex Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      github: "alexrodriguez",
    },
    category: "ui",
    tags: ["dark-mode", "toggle", "accessibility", "theme"],
    thumbnail: "/thumbnails/dark-mode-toggle.jpg",
    downloads: 2156,
    rating: 4.9,
    reviews: 156,
    lastUpdated: "2024-01-10",
    version: "2.1.0",
    isInstalled: true,
    isPremium: false,
    demoUrl: "https://demo.portflection.com/dark-mode-toggle",
    documentationUrl:
      "https://docs.portflection.com/components/dark-mode-toggle",
    githubUrl: "https://github.com/alexrodriguez/dark-mode-toggle",
    compatibility: ["React 16+", "Next.js 12+", "TypeScript"],
    dependencies: ["next-themes"],
  },
  {
    id: "interactive-timeline",
    name: "Interactive Timeline",
    description:
      "Beautiful interactive timeline component with smooth scrolling animations and rich media support.",
    author: {
      name: "Maria Garcia",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      github: "mariagarcia",
    },
    category: "content",
    tags: ["timeline", "interactive", "animation", "media"],
    thumbnail: "/thumbnails/interactive-timeline.jpg",
    downloads: 892,
    rating: 4.7,
    reviews: 67,
    lastUpdated: "2024-01-12",
    version: "1.5.0",
    isInstalled: false,
    isPremium: true,
    price: 9.99,
    demoUrl: "https://demo.portflection.com/interactive-timeline",
    documentationUrl:
      "https://docs.portflection.com/components/interactive-timeline",
    githubUrl: "https://github.com/mariagarcia/interactive-timeline",
    compatibility: ["React 18+", "Next.js 13+", "TypeScript"],
    dependencies: ["framer-motion", "react-intersection-observer"],
  },
];

export default function ComponentMarketplace() {
  const [components, setComponents] =
    useState<CommunityComponent[]>(mockComponents);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("popular");
  const [selectedComponent, setSelectedComponent] =
    useState<CommunityComponent | null>(null);

  const categories = [
    { id: "all", name: "All Components" },
    { id: "hero", name: "Hero Sections" },
    { id: "about", name: "About Sections" },
    { id: "projects", name: "Project Sections" },
    { id: "contact", name: "Contact Forms" },
    { id: "ui", name: "UI Components" },
    { id: "content", name: "Content Blocks" },
  ];

  const sortOptions = [
    { id: "popular", name: "Most Popular" },
    { id: "rating", name: "Highest Rated" },
    { id: "recent", name: "Recently Updated" },
    { id: "downloads", name: "Most Downloaded" },
  ];

  const filteredComponents = components.filter((component) => {
    const matchesSearch =
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" || component.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedComponents = [...filteredComponents].sort((a, b) => {
    switch (selectedSort) {
      case "popular":
        return b.downloads - a.downloads;
      case "rating":
        return b.rating - a.rating;
      case "recent":
        return (
          new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        );
      case "downloads":
        return b.downloads - a.downloads;
      default:
        return 0;
    }
  });

  const handleInstall = (componentId: string) => {
    setComponents((prev) =>
      prev.map((comp) =>
        comp.id === componentId ? { ...comp, isInstalled: true } : comp
      )
    );
    // Here you would typically call an API to install the component
    console.log(`Installing component: ${componentId}`);
  };

  const handleUninstall = (componentId: string) => {
    setComponents((prev) =>
      prev.map((comp) =>
        comp.id === componentId ? { ...comp, isInstalled: false } : comp
      )
    );
    // Here you would typically call an API to uninstall the component
    console.log(`Uninstalling component: ${componentId}`);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Component Marketplace</h1>
        <p className="text-gray-600">
          Discover and install community-contributed components to enhance your
          portfolio
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedSort} onValueChange={setSelectedSort}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Components</p>
                <p className="text-2xl font-bold">{components.length}</p>
              </div>
              <Download className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Installed</p>
                <p className="text-2xl font-bold">
                  {components.filter((c) => c.isInstalled).length}
                </p>
              </div>
              <Heart className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Downloads</p>
                <p className="text-2xl font-bold">
                  {components
                    .reduce((sum, c) => sum + c.downloads, 0)
                    .toLocaleString()}
                </p>
              </div>
              <Eye className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold">
                  {(
                    components.reduce((sum, c) => sum + c.rating, 0) /
                    components.length
                  ).toFixed(1)}
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Components Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedComponents.map((component) => (
          <Card
            key={component.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-video bg-gray-100 relative">
              <img
                src={component.thumbnail}
                alt={component.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/400x225?text=Component+Preview";
                }}
              />
              {component.isPremium && (
                <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500">
                  Premium
                </Badge>
              )}
            </div>

            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-1">
                    {component.name}
                  </CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {component.description}
                  </CardDescription>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={component.author.avatar} />
                  <AvatarFallback>{component.author.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">
                  {component.author.name}
                </span>
              </div>
            </CardHeader>

            <CardContent className="pb-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {renderStars(component.rating)}
                  <span className="text-sm text-gray-600 ml-1">
                    ({component.reviews})
                  </span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-sm text-gray-600">
                  {component.downloads.toLocaleString()} downloads
                </span>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {component.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {component.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{component.tags.length - 3}
                  </Badge>
                )}
              </div>
            </CardContent>

            <CardFooter className="pt-0">
              <div className="flex gap-2 w-full">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>{component.name}</DialogTitle>
                      <DialogDescription>
                        {component.description}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="aspect-video bg-gray-100 rounded-lg">
                      <img
                        src={component.thumbnail}
                        alt={component.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Author:</strong> {component.author.name}
                      </div>
                      <div>
                        <strong>Version:</strong> {component.version}
                      </div>
                      <div>
                        <strong>Last Updated:</strong>{" "}
                        {new Date(component.lastUpdated).toLocaleDateString()}
                      </div>
                      <div>
                        <strong>Downloads:</strong>{" "}
                        {component.downloads.toLocaleString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {component.demoUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={component.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {component.documentationUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={component.documentationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Documentation
                          </a>
                        </Button>
                      )}
                      {component.githubUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={component.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Source
                          </a>
                        </Button>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>

                {component.isInstalled ? (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleUninstall(component.id)}
                    className="flex-1"
                  >
                    Uninstall
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => handleInstall(component.id)}
                    className="flex-1"
                    disabled={component.isPremium}
                  >
                    {component.isPremium ? (
                      <>
                        <span className="mr-1">${component.price}</span>
                        Buy
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-1" />
                        Install
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {sortedComponents.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No components found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters to find what you're
            looking for.
          </p>
        </div>
      )}
    </div>
  );
}
