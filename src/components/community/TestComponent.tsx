"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TestComponentProps {
  title?: string;
  message?: string;
  color?: string;
}

export default function TestComponent({
  title = "Test Component",
  message = "This is a test component loaded dynamically",
  color = "blue"
}: TestComponentProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle style={{ color }}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{message}</p>
        <div className="mt-4 p-2 bg-gray-100 rounded text-sm">
          <strong>Props received:</strong>
          <pre className="mt-1 text-xs">
            {JSON.stringify({ title, message, color }, null, 2)}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}