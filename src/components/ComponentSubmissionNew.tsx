"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Upload } from "lucide-react";
import { validateComponentCode } from "@/lib/componentCodeGenerator";

interface ComponentSubmissionForm {
  name: string;
  description: string;
  category: string;
  tags: string[];
  componentCode: string;
  demoUrl?: string;
  documentationUrl?: string;
  githubUrl?: string;
  isPremium: boolean;
  price?: number;
  compatibility: string[];
  dependencies: string[];
}

export function ComponentSubmissionNew() {
  const [formData, setFormData] = useState<ComponentSubmissionForm>({
    name: "",
    description: "",
    category: "hero",
    tags: [],
    componentCode: "",
    isPremium: false,
    compatibility: ["React 18+", "TypeScript"],
    dependencies: [],
  });

  const [validation, setValidation] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Validate component code in real-time
  const handleCodeChange = (code: string) => {
    setFormData((prev) => ({ ...prev, componentCode: code }));

    if (code.trim()) {
      const validationResult = validateComponentCode(code);
      setValidation(validationResult);
    } else {
      setValidation(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Validate the component code
      const validationResult = validateComponentCode(formData.componentCode);

      if (!validationResult.isValid) {
        throw new Error(
          `Component validation failed: ${validationResult.errors.join(", ")}`
        );
      }

      // Submit to API
      const response = await fetch("/api/components/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit component");
      }

      setSubmitStatus("success");
      // Reset form
      setFormData({
        name: "",
        description: "",
        category: "hero",
        tags: [],
        componentCode: "",
        isPremium: false,
        compatibility: ["React 18+", "TypeScript"],
        dependencies: [],
      });
      setValidation(null);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Submit Community Component
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Component Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e.g., AnimatedHero, ContactForm"
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="hero">Hero Section</option>
                  <option value="about">About Section</option>
                  <option value="projects">Projects Section</option>
                  <option value="contact">Contact Section</option>
                  <option value="skills">Skills Section</option>
                  <option value="testimonials">Testimonials</option>
                  <option value="navigation">Navigation</option>
                  <option value="footer">Footer</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Describe what your component does and its features..."
                rows={3}
                required
              />
            </div>

            {/* Component Code */}
            <div>
              <Label htmlFor="componentCode">Component Code *</Label>
              <Textarea
                id="componentCode"
                value={formData.componentCode}
                onChange={(e) => handleCodeChange(e.target.value)}
                placeholder={`// Example component
interface MyComponentProps {
  title?: string;
  subtitle?: string;
}

export default function MyComponent({ 
  title = "Default Title", 
  subtitle = "Default subtitle" 
}: MyComponentProps) {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-xl text-gray-600">{subtitle}</p>
    </div>
  );
}`}
                rows={15}
                className="font-mono text-sm"
                required
              />

              {/* Real-time validation feedback */}
              {validation && (
                <div className="mt-2">
                  {validation.isValid ? (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        Component code is valid! ✅
                        {validation.warnings.length > 0 && (
                          <div className="mt-1 text-sm">
                            <strong>Warnings:</strong>{" "}
                            {validation.warnings.join(", ")}
                          </div>
                        )}
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Validation Errors:</strong>
                        <ul className="mt-1 list-disc list-inside">
                          {validation.errors.map(
                            (error: string, index: number) => (
                              <li key={index}>{error}</li>
                            )
                          )}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags.join(", ")}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      tags: e.target.value
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter(Boolean),
                    }))
                  }
                  placeholder="e.g., animated, responsive, dark-mode"
                />
              </div>
              <div>
                <Label htmlFor="demoUrl">Demo URL</Label>
                <Input
                  id="demoUrl"
                  type="url"
                  value={formData.demoUrl || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      demoUrl: e.target.value,
                    }))
                  }
                  placeholder="https://example.com/demo"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="documentationUrl">Documentation URL</Label>
                <Input
                  id="documentationUrl"
                  type="url"
                  value={formData.documentationUrl || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      documentationUrl: e.target.value,
                    }))
                  }
                  placeholder="https://github.com/username/repo#readme"
                />
              </div>
              <div>
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input
                  id="githubUrl"
                  type="url"
                  value={formData.githubUrl || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      githubUrl: e.target.value,
                    }))
                  }
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>

            {/* Premium Options */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isPremium"
                checked={formData.isPremium}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    isPremium: e.target.checked,
                  }))
                }
                className="rounded"
              />
              <Label htmlFor="isPremium">This is a premium component</Label>
            </div>

            {formData.isPremium && (
              <div>
                <Label htmlFor="price">Price (USD)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      price: e.target.value
                        ? parseFloat(e.target.value)
                        : undefined,
                    }))
                  }
                  placeholder="9.99"
                />
              </div>
            )}

            {/* Submit Status */}
            {submitStatus === "success" && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Component submitted successfully! It will be reviewed by our
                  team.
                </AlertDescription>
              </Alert>
            )}

            {submitStatus === "error" && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Failed to submit component. Please try again.
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              disabled={isSubmitting || !validation?.isValid}
              className="w-full"
            >
              {isSubmitting ? "Submitting..." : "Submit Component"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
