"use client";

import React, { useState, useEffect } from 'react';
import { loadComponentRegistry, ComponentMetadata } from '@/lib/componentRegistry';
import { CommunityComponentRenderer } from '@/components/community/CommunityComponentRenderer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

export default function TestComponentsPage() {
  const [components, setComponents] = useState<ComponentMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<ComponentMetadata | null>(null);

  useEffect(() => {
    async function loadComponents() {
      try {
        setLoading(true);
        const registry = await loadComponentRegistry();
        const componentList = Object.values(registry);
        setComponents(componentList);
        console.log('Loaded components:', componentList);
      } catch (err) {
        console.error('Failed to load components:', err);
        setError(err instanceof Error ? err.message : 'Failed to load components');
      } finally {
        setLoading(false);
      }
    }

    loadComponents();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading components...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Component Test Page</h1>
        <p className="text-gray-600">
          Found {components.length} approved components in the registry
        </p>
      </div>

      {components.length === 0 ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No approved components found. You may need to:
            <ul className="list-disc list-inside mt-2">
              <li>Submit components for approval</li>
              <li>Run the conversion script: <code>npm run convert-components</code></li>
              <li>Check the database for approved components</li>
            </ul>
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((component) => (
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
                  
                  <div className="text-sm text-gray-500">
                    <p>Category: {component.category}</p>
                    <p>Author: {component.authorName}</p>
                    <p>Downloads: {component.downloads}</p>
                    <p>Rating: {component.rating.toFixed(1)} ⭐</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

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
                onError={(error) => (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Failed to load component: {error.message}
                    </AlertDescription>
                  </Alert>
                )}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 