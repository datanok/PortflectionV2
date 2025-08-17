"use client";

import React, { useState } from "react";
import { CommunityComponentRenderer } from "@/components/community/CommunityComponentRenderer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestCommunityComponentsPage() {
  const [componentId, setComponentId] = useState("test-component");
  const [props, setProps] = useState({
    title: "Dynamic Title",
    message: "This message was set dynamically",
    color: "green",
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Test Community Components</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="componentId">Component ID</Label>
              <Input
                id="componentId"
                value={componentId}
                onChange={(e) => setComponentId(e.target.value)}
                placeholder="Enter component ID"
              />
            </div>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={props.title}
                onChange={(e) => setProps({ ...props, title: e.target.value })}
                placeholder="Component title"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="message">Message</Label>
              <Input
                id="message"
                value={props.message}
                onChange={(e) =>
                  setProps({ ...props, message: e.target.value })
                }
                placeholder="Component message"
              />
            </div>
            <div>
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                value={props.color}
                onChange={(e) => setProps({ ...props, color: e.target.value })}
                placeholder="Text color"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Component Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <CommunityComponentRenderer
            componentId={componentId}
            props={props}
            className="border rounded-lg p-4"
            onError={(error) => console.error("Component error:", error)}
            onLoad={(metadata) => {}}
          />
        </CardContent>
      </Card>

      <div className="text-sm text-gray-600">
        <p>
          <strong>Available test components:</strong>
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>
            <code>test-component</code> - Basic test component
          </li>
          <li>
            <code>example-hero</code> - Hero section component
          </li>
        </ul>
      </div>
    </div>
  );
}
