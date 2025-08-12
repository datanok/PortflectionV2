"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// This is a test component that would be stored as a code string in the database
export const TestMarketplaceComponent = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🎉 Test Marketplace Component
          <Badge variant="secondary">Community</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This is a test component from the marketplace! It demonstrates how
          community-contributed components can be rendered using React Live.
        </p>
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">Features:</h4>
          <ul className="text-sm space-y-1">
            <li>✅ Rendered from code string</li>
            <li>✅ Safe execution with React Live</li>
            <li>✅ Integrated with portfolio builder</li>
            <li>✅ Supports props and styling</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

// Code string version (what would be stored in database)
export const testComponentCode = `
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function TestMarketplaceComponent(props) {
  return (
    <Card className="w-full" style={{ 
      backgroundColor: props.backgroundColor || '#ffffff',
      color: props.textColor || '#000000'
    }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🎉 Test Marketplace Component
          <Badge variant="secondary">Community</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          This is a test component from the marketplace! It demonstrates how 
          community-contributed components can be rendered using React Live.
        </p>
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">Features:</h4>
          <ul className="text-sm space-y-1">
            <li>✅ Rendered from code string</li>
            <li>✅ Safe execution with React Live</li>
            <li>✅ Integrated with portfolio builder</li>
            <li>✅ Supports props and styling</li>
          </ul>
        </div>
        {props.title && (
          <div className="mt-4 p-3 bg-primary/10 rounded">
            <strong>Custom Title:</strong> {props.title}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
`;
