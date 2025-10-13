"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { savePortfolio } from "@/actions/portfolio-actions";
import { mapWithRegistry, ResumeJson, Preset } from "@/lib/resumeMapper";
import { componentRegistry } from "@/lib/portfolio/registry";
import { colorSchemes, getDefaultColorScheme } from "@/lib/colorSchemes";
import { toast } from "sonner";
import { Upload, Check, Sparkles } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export default function ImportResumePage() {
  const router = useRouter();
  const [preset, setPreset] = useState<Preset>("minimal");
  const [chosen, setChosen] = useState({
    hero: componentRegistry.hero?.variants[0]?.id || "hero-section",
    about: componentRegistry.about?.variants[0]?.id || undefined,
    skills: componentRegistry.skills?.variants[0]?.id || undefined,
    projects: componentRegistry.projects?.variants[0]?.id || undefined,
    contact: componentRegistry.contact?.variants[0]?.id || undefined,
    colorScheme: getDefaultColorScheme().id,
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const presets = useMemo(
    () => [
      {
        id: "minimal",
        name: "Minimal",
        description: "Clean, simple, and elegant design",
        preview: "https://placehold.co/640x360/e5e7eb/3b82f6?text=Minimal",
      },
      {
        id: "brutalist",
        name: "Neo-Brutalist",
        description: "Bold cards with chunky shadows",
        preview: "https://placehold.co/640x360/fef3c7/111111?text=Brutalist",
      },
      {
        id: "typography",
        name: "Typography",
        description: "Developer-centric monospace aesthetic",
        preview: "https://placehold.co/640x360/f1f5f9/0f172a?text=Typography",
      },
    ],
    []
  );

  // Get available sections from registry
  const availableSections = useMemo(() => {
    return Object.keys(componentRegistry).filter(
      (key) => componentRegistry[key]?.variants?.length > 0
    );
  }, []);

  // Define preset configurations dynamically
  const presetConfigs = useMemo(() => {
    const getFirstVariantId = (sectionKey: string) =>
      componentRegistry[sectionKey as keyof typeof componentRegistry]
        ?.variants[0]?.id;

    const getVariantIdByName = (sectionKey: string, namePattern: string) => {
      const section =
        componentRegistry[sectionKey as keyof typeof componentRegistry];
      if (!section?.variants) return null;

      return section.variants.find(
        (variant) =>
          variant.name.toLowerCase().includes(namePattern.toLowerCase()) ||
          variant.id.toLowerCase().includes(namePattern.toLowerCase())
      )?.id;
    };

    const buildTemplates = (pattern: string) => {
      const templates: Record<string, string | undefined> = {};
      availableSections.forEach((section) => {
        templates[section] =
          getVariantIdByName(section, pattern) || getFirstVariantId(section);
      });
      return templates;
    };

    return {
      minimal: {
        templates: buildTemplates("minimal"),
        colorScheme: colorSchemes[1]?.id || getDefaultColorScheme().id,
      },
      brutalist: {
        templates: buildTemplates("brutalist"),
        colorScheme: colorSchemes[0]?.id || getDefaultColorScheme().id,
      },
      typography: {
        templates: buildTemplates("typography"),
        colorScheme:
          colorSchemes[2]?.id ||
          colorSchemes[0]?.id ||
          getDefaultColorScheme().id,
      },
    };
  }, [availableSections]);

  const handlePresetChange = (newPreset: Preset) => {
    setPreset(newPreset);
    const config = presetConfigs[newPreset];
    if (config) {
      setChosen((prevChosen) => ({
        ...prevChosen,
        ...config.templates,
        colorScheme: config.colorScheme,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!file) {
      setError("Please select a PDF or DOCX file.");
      return;
    }
    setIsSubmitting(true);
    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("/api/resume/parse", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errorMessage =
          errorData.details ||
          errorData.error ||
          `Parser error (${res.status})`;
        throw new Error(errorMessage);
      }

      const response = await res.json();
      const resumeJson = response.data || (response as ResumeJson);

      if (!resumeJson || !resumeJson.basics) {
        throw new Error("Invalid resume data received from parser");
      }
      console.log(resumeJson, "res");

      const draft = mapWithRegistry(resumeJson, chosen);
      const result = await savePortfolio(draft);

      toast.success("Portfolio created successfully!", {
        description: `Your resume has been converted to a portfolio.`,
      });

      router.push(`/dashboard/portfolios/edit/${result.data.id}`);
    } catch (err: any) {
      console.error("Resume import error:", err);
      setError(err?.message || "Failed to import resume");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="mr-1 h-3 w-3" />
            Resume to Portfolio
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Create Your Portfolio in Seconds
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Upload your resume and we&apos;ll generate a beautiful,
            fully-editable portfolio with your chosen design preset.
          </p>
        </div>

        <div className="space-y-8">
          {/* Step 1: Template Preset */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  1
                </div>
                <div>
                  <CardTitle>Choose Your Design Preset</CardTitle>
                  <CardDescription>
                    Select a style that matches your personality
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {presets.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`group relative rounded-lg border-2 p-4 text-left transition-all hover:shadow-md ${
                      preset === p.id
                        ? "border-primary shadow-sm"
                        : "border-border hover:border-muted-foreground"
                    }`}
                    onClick={() => handlePresetChange(p.id as Preset)}
                  >
                    {preset === p.id && (
                      <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                        <Check className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                    <img
                      src={p.preview}
                      alt={p.name}
                      className="mb-4 w-full rounded-md aspect-video object-cover"
                    />
                    <h3 className="font-semibold mb-1">{p.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {p.description}
                    </p>
                  </button>
                ))}
              </div>

              {/* Color Schemes */}
              <div className="mt-8 pt-8 border-t">
                <Label className="text-base font-semibold mb-4 block">
                  Color Scheme
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {colorSchemes.map((scheme) => (
                    <button
                      key={scheme.id}
                      type="button"
                      className={`group rounded-lg border-2 p-3 transition-all ${
                        chosen.colorScheme === scheme.id
                          ? "border-primary"
                          : "border-border hover:border-muted-foreground"
                      }`}
                      onClick={() =>
                        setChosen((c) => ({ ...c, colorScheme: scheme.id }))
                      }
                    >
                      <div
                        className="w-full h-12 rounded-md mb-2"
                        style={{ background: scheme.preview }}
                      />
                      <div className="text-xs font-medium text-center">
                        {scheme.name}
                      </div>
                      {chosen.colorScheme === scheme.id && (
                        <div className="mt-1 flex justify-center">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Upload Resume */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  2
                </div>
                <div>
                  <CardTitle>Upload Your Resume</CardTitle>
                  <CardDescription>
                    Supports PDF, DOC, and DOCX formats
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="max-w-xl">
                <div className="relative">
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      setFile(e.target.files?.[0] || null);
                      setError(null);
                    }}
                    className="cursor-pointer"
                    id="resume-upload"
                  />
                  {!file && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <Upload className="h-4 w-4 text-muted-foreground mr-2" />
                    </div>
                  )}
                </div>
                {file && (
                  <p className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    {file.name}
                  </p>
                )}
                {error && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Step 3: Section Templates */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  3
                </div>
                <div>
                  <CardTitle>Customize Section Templates</CardTitle>
                  <CardDescription>
                    Fine-tune individual sections (optional)
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {availableSections.map((section) => {
                  const sectionData =
                    componentRegistry[
                      section as keyof typeof componentRegistry
                    ];
                  if (!sectionData?.variants?.length) return null;

                  const isAutoSelected =
                    presetConfigs[preset]?.templates[section] ===
                    chosen[section];

                  return (
                    <div key={section} className="space-y-2">
                      <Label className="text-sm font-medium capitalize flex items-center gap-2">
                        {section}
                        {isAutoSelected && (
                          <Badge variant="secondary" className="text-xs">
                            Auto
                          </Badge>
                        )}
                      </Label>
                      <Select
                        value={chosen[section] || ""}
                        onValueChange={(val) =>
                          setChosen((c) => ({ ...c, [section]: val }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={`Select ${section}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {sectionData.variants.map((v) => (
                            <SelectItem key={v.id} value={v.id}>
                              <span className="flex items-center gap-2">
                                {v.name}
                                {presetConfigs[preset]?.templates[section] ===
                                  v.id && (
                                  <span className="text-primary">★</span>
                                )}
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !file}
              size="lg"
              className="min-w-[200px]"
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Portfolio
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
