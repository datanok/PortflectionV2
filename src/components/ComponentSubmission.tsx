"use client";

import React, { useState } from "react";
import {
  Upload,
  Code,
  FileText,
  Image,
  Package,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { authClient } from "../../auth-client";

interface ComponentSubmission {
  name: string;
  description: string;
  category: string;
  tags: string[];
  componentCode: string;
  thumbnail: File | null;
  demoUrl: string;
  documentationUrl: string;
  githubUrl: string;
  version: string;
  isPremium: boolean;
  price?: number;
  compatibility: string[];
  dependencies: string[];
  author: {
    name: string;
    email: string;
    github: string;
  };
}

const categories = [
  { id: "hero", name: "Hero Sections" },
  { id: "about", name: "About Sections" },
  { id: "projects", name: "Project Sections" },
  { id: "skills", name: "Skills Sections" },
  { id: "contact", name: "Contact Forms" },
  { id: "navbar", name: "Navigation" },
  { id: "footer", name: "Footer" },
  { id: "ui", name: "UI Components" },
  { id: "content", name: "Content Blocks" },
  { id: "custom", name: "Custom Components" },
];

const compatibilityOptions = [
  "React 16+",
  "React 18+",
  "Next.js 12+",
  "Next.js 13+",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "CSS Modules",
];

export default function ComponentSubmission() {
  const { data: session, isPending: sessionLoading } = authClient.useSession();

  const [submission, setSubmission] = useState<ComponentSubmission>({
    name: "",
    description: "",
    category: "",
    tags: [],
    componentCode: "",
    thumbnail: null,
    demoUrl: "",
    documentationUrl: "",
    githubUrl: "",
    version: "1.0.0",
    isPremium: false,
    price: undefined,
    compatibility: [],
    dependencies: [],
    author: {
      name: "",
      email: "",
      github: "",
    },
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tagInput, setTagInput] = useState("");
  const [dependencyInput, setDependencyInput] = useState("");

  const steps = [
    { id: 1, name: "Basic Info", icon: FileText },
    { id: 2, name: "Component Code", icon: Code },
    { id: 3, name: "Media & Links", icon: Image },
    { id: 4, name: "Review & Submit", icon: CheckCircle },
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!submission.name.trim())
          newErrors.name = "Component name is required";
        if (!submission.description.trim())
          newErrors.description = "Description is required";
        if (!submission.category) newErrors.category = "Category is required";
        if (submission.tags.length === 0)
          newErrors.tags = "At least one tag is required";
        if (!submission.author.name.trim())
          newErrors.authorName = "Author name is required";
        if (!submission.author.email.trim())
          newErrors.authorEmail = "Author email is required";
        break;
      case 2:
        if (!submission.componentCode.trim())
          newErrors.componentCode = "Component code is required";
        break;
      case 3:
        if (!submission.demoUrl.trim())
          newErrors.demoUrl = "Demo URL is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      // Prepare the submission data
      const submissionData = {
        name: submission.name,
        description: submission.description,
        category: submission.category,
        tags: submission.tags,
        componentCode: submission.componentCode,
        thumbnail: submission.thumbnail
          ? await fileToBase64(submission.thumbnail)
          : "",
        demoUrl: submission.demoUrl,
        documentationUrl: submission.documentationUrl,
        githubUrl: submission.githubUrl,
        version: submission.version,
        isPremium: submission.isPremium,
        price: submission.price,
        compatibility: submission.compatibility,
        dependencies: submission.dependencies,
        author: submission.author,
      };

      // Submit to API
      const response = await fetch("/api/components/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Submission failed");
      }

      const result = await response.json();

      // Success - show success message and reset form
      toast.success(
        `Component submitted successfully! Submission ID: ${result.submission.id}. It will be reviewed within 48 hours.`
      );

      // Reset form
      setSubmission({
        name: "",
        description: "",
        category: "",
        tags: [],
        componentCode: "",
        thumbnail: null,
        demoUrl: "",
        documentationUrl: "",
        githubUrl: "",
        version: "1.0.0",
        isPremium: false,
        price: undefined,
        compatibility: [],
        dependencies: [],
        author: {
          name: "",
          email: "",
          github: "",
        },
      });
      setCurrentStep(1);
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error(`Submission failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const addTag = () => {
    if (tagInput.trim() && !submission.tags.includes(tagInput.trim())) {
      setSubmission((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setSubmission((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const addDependency = () => {
    if (
      dependencyInput.trim() &&
      !submission.dependencies.includes(dependencyInput.trim())
    ) {
      setSubmission((prev) => ({
        ...prev,
        dependencies: [...prev.dependencies, dependencyInput.trim()],
      }));
      setDependencyInput("");
    }
  };

  const removeDependency = (depToRemove: string) => {
    setSubmission((prev) => ({
      ...prev,
      dependencies: prev.dependencies.filter((dep) => dep !== depToRemove),
    }));
  };

  const toggleCompatibility = (option: string) => {
    setSubmission((prev) => ({
      ...prev,
      compatibility: prev.compatibility.includes(option)
        ? prev.compatibility.filter((c) => c !== option)
        : [...prev.compatibility, option],
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSubmission((prev) => ({ ...prev, thumbnail: file }));
    }
  };

  // Show loading state while checking authentication
  if (sessionLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size={32} />
          <span className="ml-3">Loading...</span>
        </div>
      </div>
    );
  }

  // Show login required message if not authenticated
  if (!session?.user) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold mb-4">Login Required</h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in to submit components.
          </p>
          <a
            href="/sign-in"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Submit a Component</h1>
        <p className="text-gray-600">
          Share your component with the community and help others build amazing
          portfolios
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                {React.createElement(step.icon, { className: "w-5 h-5" })}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 h-0.5 mx-2 ${
                    currentStep > step.id ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((step) => (
            <span
              key={step.id}
              className={`text-sm ${
                currentStep >= step.id
                  ? "text-blue-600 font-medium"
                  : "text-gray-500"
              }`}
            >
              {step.name}
            </span>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {React.createElement(steps[currentStep - 1].icon, {
              className: "w-5 h-5",
            })}
            {steps[currentStep - 1].name}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 &&
              "Provide basic information about your component"}
            {currentStep === 2 &&
              "Upload your component code and define its structure"}
            {currentStep === 3 && "Add demo links and optional media"}
            {currentStep === 4 && "Review your submission before submitting"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="name">Component Name *</Label>
                <Input
                  id="name"
                  value={submission.name}
                  onChange={(e) =>
                    setSubmission((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e.g., Animated Hero Section"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={submission.description}
                  onChange={(e) =>
                    setSubmission((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Describe what your component does and its key features..."
                  rows={4}
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={submission.category}
                  onValueChange={(value) =>
                    setSubmission((prev) => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger
                    className={errors.category ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
              </div>

              <div>
                <Label>Tags *</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag..."
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {submission.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => removeTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
                {errors.tags && (
                  <p className="text-red-500 text-sm mt-1">{errors.tags}</p>
                )}
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="authorName">Author Name *</Label>
                  <Input
                    id="authorName"
                    value={submission.author.name}
                    onChange={(e) =>
                      setSubmission((prev) => ({
                        ...prev,
                        author: { ...prev.author, name: e.target.value },
                      }))
                    }
                    placeholder="Your name"
                    className={errors.authorName ? "border-red-500" : ""}
                  />
                  {errors.authorName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.authorName}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="authorEmail">Email *</Label>
                  <Input
                    id="authorEmail"
                    type="email"
                    value={submission.author.email}
                    onChange={(e) =>
                      setSubmission((prev) => ({
                        ...prev,
                        author: { ...prev.author, email: e.target.value },
                      }))
                    }
                    placeholder="your.email@example.com"
                    className={errors.authorEmail ? "border-red-500" : ""}
                  />
                  {errors.authorEmail && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.authorEmail}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="authorGithub">GitHub Username</Label>
                <Input
                  id="authorGithub"
                  value={submission.author.github}
                  onChange={(e) =>
                    setSubmission((prev) => ({
                      ...prev,
                      author: { ...prev.author, github: e.target.value },
                    }))
                  }
                  placeholder="your-github-username"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="componentCode">Component Code *</Label>
                <Textarea
                  id="componentCode"
                  value={submission.componentCode}
                  onChange={(e) =>
                    setSubmission((prev) => ({
                      ...prev,
                      componentCode: e.target.value,
                    }))
                  }
                  placeholder="Paste your React component code here..."
                  rows={15}
                  className="font-mono text-sm"
                />
                {errors.componentCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.componentCode}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="version">Version</Label>
                <Input
                  id="version"
                  value={submission.version}
                  onChange={(e) =>
                    setSubmission((prev) => ({
                      ...prev,
                      version: e.target.value,
                    }))
                  }
                  placeholder="1.0.0"
                />
              </div>

              <div>
                <Label>Dependencies</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={dependencyInput}
                    onChange={(e) => setDependencyInput(e.target.value)}
                    placeholder="e.g., framer-motion"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addDependency())
                    }
                  />
                  <Button
                    type="button"
                    onClick={addDependency}
                    variant="outline"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {submission.dependencies.map((dep) => (
                    <Badge
                      key={dep}
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => removeDependency(dep)}
                    >
                      {dep} ×
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>Compatibility</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {compatibilityOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Switch
                        id={option}
                        checked={submission.compatibility.includes(option)}
                        onCheckedChange={() => toggleCompatibility(option)}
                      />
                      <Label htmlFor={option} className="text-sm">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="thumbnail">Thumbnail Image (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Upload a preview image (400x300px recommended)
                  </p>
                  <Input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() =>
                      document.getElementById("thumbnail")?.click()
                    }
                  >
                    Choose File
                  </Button>
                  {submission.thumbnail && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {submission.thumbnail.name}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="demoUrl">Demo URL *</Label>
                <Input
                  id="demoUrl"
                  value={submission.demoUrl}
                  onChange={(e) =>
                    setSubmission((prev) => ({
                      ...prev,
                      demoUrl: e.target.value,
                    }))
                  }
                  placeholder="https://demo.example.com"
                  className={errors.demoUrl ? "border-red-500" : ""}
                />
                {errors.demoUrl && (
                  <p className="text-red-500 text-sm mt-1">{errors.demoUrl}</p>
                )}
              </div>

              <div>
                <Label htmlFor="documentationUrl">Documentation URL</Label>
                <Input
                  id="documentationUrl"
                  value={submission.documentationUrl}
                  onChange={(e) =>
                    setSubmission((prev) => ({
                      ...prev,
                      documentationUrl: e.target.value,
                    }))
                  }
                  placeholder="https://docs.example.com"
                />
              </div>

              <div>
                <Label htmlFor="githubUrl">GitHub Repository URL</Label>
                <Input
                  id="githubUrl"
                  value={submission.githubUrl}
                  onChange={(e) =>
                    setSubmission((prev) => ({
                      ...prev,
                      githubUrl: e.target.value,
                    }))
                  }
                  placeholder="https://github.com/username/repo"
                />
              </div>

              <Separator />

              <div className="flex items-center space-x-2">
                <Switch
                  id="isPremium"
                  checked={submission.isPremium}
                  onCheckedChange={(checked) =>
                    setSubmission((prev) => ({ ...prev, isPremium: checked }))
                  }
                />
                <Label htmlFor="isPremium">Premium Component</Label>
              </div>

              {submission.isPremium && (
                <div>
                  <Label htmlFor="price">Price (USD)</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={submission.price || ""}
                    onChange={(e) =>
                      setSubmission((prev) => ({
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
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Please review your submission carefully. Once submitted, it
                  will be reviewed by our team within 48 hours.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Component Details</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Name:</strong> {submission.name}
                    </p>
                    <p>
                      <strong>Category:</strong>{" "}
                      {
                        categories.find((c) => c.id === submission.category)
                          ?.name
                      }
                    </p>
                    <p>
                      <strong>Version:</strong> {submission.version}
                    </p>
                    <p>
                      <strong>Tags:</strong> {submission.tags.join(", ")}
                    </p>
                    <p>
                      <strong>Premium:</strong>{" "}
                      {submission.isPremium ? `$${submission.price}` : "No"}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Author Information</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Name:</strong> {submission.author.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {submission.author.email}
                    </p>
                    {submission.author.github && (
                      <p>
                        <strong>GitHub:</strong> {submission.author.github}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Description</h3>
                <p className="text-sm text-gray-600">
                  {submission.description}
                </p>
              </div>

              {submission.dependencies.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Dependencies</h3>
                  <div className="flex flex-wrap gap-2">
                    {submission.dependencies.map((dep) => (
                      <Badge key={dep} variant="outline">
                        {dep}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {submission.compatibility.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Compatibility</h3>
                  <div className="flex flex-wrap gap-2">
                    {submission.compatibility.map((comp) => (
                      <Badge key={comp} variant="secondary">
                        {comp}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            {currentStep < steps.length ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="min-w-[120px]"
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size={16} />
                    <span className="ml-2">Submitting...</span>
                  </>
                ) : (
                  "Submit Component"
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
