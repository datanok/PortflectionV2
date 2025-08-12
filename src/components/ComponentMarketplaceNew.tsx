"use client";

import React, { useState, useEffect } from 'react';
import { loadComponentRegistry, ComponentMetadata } from '@/lib/componentRegistry';
import { CommunityComponentRenderer } from '@/components/community/CommunityComponentRenderer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, Star, Eye } from 'lucide-react';

export function ComponentMarketplaceNew() {
  const [components, setComponents] = useState<ComponentMetadata[]>([]);
  const [filteredComponents, setFilteredComponents] = useState<ComponentMetadata[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState<ComponentMetadata | null>(null);

  useEffect(() => {
    async function loadComponents() {
      try {
        const registry = await loadComponentRegistry();
        const componentList = Object.values(registry);
        setComponents(componentList);
        
        // Get unique categories
        const uniqueCategories = [...new Set(componentList.map(c => c.category))];
        setCategories(uniqueCategories);
        
      } catch (error) {
        console.error('Failed to load components:', error);
      } finally {
        setLoading(false);
      }
    }

    loadComponents();
  }, []);

  useEffect(() => {
    let filtered = components;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(c => c.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredComponents(filtered);
  }, [components, selectedCategory, searchQuery]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h1 className="text-3xl font-bold">Component Marketplace</h1>
        
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredComponents.map((component) => (
          <Card 
            key={component.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedComponent(component)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{component.name}</CardTitle>
                <Badge variant={component.isPremium ? "default" : "secondary"}>
                  {component.isPremium ? "Premium" : "Free"}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{component.description}</p>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {component.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {component.downloads}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      {component.rating.toFixed(1)}
                    </span>
                  </div>
                  <span>by {component.authorName}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Component Preview Modal */}
      {selectedComponent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{selectedComponent.name}</h2>
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedComponent(null)}
                >
                  ✕
                </Button>
              </div>
              <p className="text-gray-600 mt-2">{selectedComponent.description}</p>
            </div>
            
            <div className="p-6">
              <CommunityComponentRenderer
                componentId={selectedComponent.id}
                props={{
                  title: "Preview Title",
                  subtitle: "This is a preview of the component",
                  ctaText: "Preview CTA"
                }}
                className="border rounded-lg p-4"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 