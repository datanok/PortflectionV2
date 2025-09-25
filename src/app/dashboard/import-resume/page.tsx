"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { savePortfolio } from "@/actions/portfolio-actions";
import { mapWithRegistry, ResumeJson, Preset } from "@/lib/resumeMapper";
import { componentRegistry } from "@/lib/portfolio/registry";
import { colorSchemes, getDefaultColorScheme } from "@/lib/colorSchemes";
import { toast } from "sonner";

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

export default function ImportResumePage() {
  const router = useRouter();
  const [preset, setPreset] = useState<Preset>("brutalist");
  const [chosen, setChosen] = useState({
    hero: componentRegistry.hero.variants[0]?.id || "hero-section",
    about: componentRegistry.about.variants[0]?.id || undefined,
    skills: componentRegistry.skills.variants[0]?.id || undefined,
    projects: componentRegistry.projects.variants[0]?.id || undefined,
    contact: componentRegistry.contact.variants[0]?.id || undefined,
    colorScheme: getDefaultColorScheme().id,
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const presets = useMemo(
    () => [
      {
        id: "brutalist",
        name: "Neo-Brutalist",
        description: "Bold cards, chunky shadows, striking colors",
        accent: "var(--primary)",
        preview:
          "https://placehold.co/640x360/fffef7/111111?text=Brutalist+Preview",
      },
      {
        id: "typography",
        name: "Typography",
        description: "Clean, developer-centric, monospace aesthetic",
        accent: "var(--accent)",
        preview:
          "https://placehold.co/640x360/f8fafc/0f172a?text=Typography+Preview",
      },
    ],
    []
  );

  // Define preset configurations with their optimal template selections
  const presetConfigs = useMemo(() => {
    const getFirstVariantId = (sectionKey: string) => 
      componentRegistry[sectionKey as keyof typeof componentRegistry]?.variants[0]?.id;
    
    const getVariantIdByName = (sectionKey: string, namePattern: string) => {
      const section = componentRegistry[sectionKey as keyof typeof componentRegistry];
      if (!section) return null;
      
      return section.variants.find(variant => 
        variant.name.toLowerCase().includes(namePattern.toLowerCase()) ||
        variant.id.toLowerCase().includes(namePattern.toLowerCase())
      )?.id;
    };
    
    return {
      brutalist: {
        templates: {
          hero: getVariantIdByName('hero', 'neo-brutalist') || getFirstVariantId('hero') || "hero-section",
          about: getVariantIdByName('about', 'neobrutalist') || getFirstVariantId('about'),
          skills: getVariantIdByName('skills', 'brutalist') || getFirstVariantId('skills'),
          projects: getVariantIdByName('projects', 'brutalist') || getFirstVariantId('projects'),
          contact: getVariantIdByName('contact', 'neobrutalist') || getFirstVariantId('contact')
        },
        colorScheme: colorSchemes[0]?.id || getDefaultColorScheme().id
      },
      typography: {
        templates: {
          hero: getVariantIdByName('hero', 'typography') || getFirstVariantId('hero'),
          about: getVariantIdByName('about', 'typography') || getFirstVariantId('about'),
          skills: getVariantIdByName('skills', 'typography') || getFirstVariantId('skills'),
          projects: getVariantIdByName('projects', 'typography') || getFirstVariantId('projects'),
          contact: getVariantIdByName('contact', 'typography') || getFirstVariantId('contact')
        },
        colorScheme: colorSchemes[2]?.id || colorSchemes[0]?.id || getDefaultColorScheme().id
      }
    };
  }, []);

  // Handle preset selection with automatic template configuration
  const handlePresetChange = (newPreset: Preset) => {
    setPreset(newPreset);
    // Get the preset configuration
    const config = presetConfigs[newPreset];
    if (config) {
      // Update chosen templates and color scheme based on preset
      setChosen(prevChosen => ({
        ...prevChosen,
        ...config.templates,
        colorScheme: config.colorScheme
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

      // Handle the new API response format
      const resumeJson = response.data || (response as ResumeJson);

      if (!resumeJson || !resumeJson.basics) {
        throw new Error("Invalid resume data received from parser");
      }

      const draft = mapWithRegistry(resumeJson, chosen);
      const result = await savePortfolio(draft);

      // Show success message
      toast.success("Portfolio created successfully!", {
        description: `Your resume has been converted to a portfolio. You can now edit and customize it.`,
      });

      // Redirect to the portfolio editor
      router.push(`/dashboard/portfolios/edit/${result.data.id}`);
    } catch (err: any) {
      console.error("Resume import error:", err);
      setError(err?.message || "Failed to import resume");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto px-4 max-w-6xl py-8">
        <header className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-md border px-3 py-1 bg-accent text-xs font-bold uppercase">
            <span>Import</span>
            <span>Resume</span>
          </div>
          <h1 className="mt-4 text-2xl md:text-3xl font-black">
            Create a Portfolio from Your Resume
          </h1>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            Choose a premium preset, upload your resume (PDF/DOC/DOCX), and
            we&apos;ll generate a fully-editable portfolio for you in seconds.
          </p>
        </header>

        <div className="space-y-6">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Preset Selection - Compact Grid */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">1. Choose Template</CardTitle>
                  <CardDescription className="text-sm">
                    Templates and colors will be automatically configured
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {presets.map((p) => (
                      <div
                        key={p.id}
                        className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                          preset === p.id
                            ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => handlePresetChange(p.id as Preset)}
                      >
                        <img
                          src={p.preview}
                          alt={p.name}
                          className="w-full aspect-[5/3] object-cover rounded mb-3"
                        />
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="font-semibold text-base">{p.name}</div>
                            {preset === p.id && (
                              <div className="text-xs font-medium text-primary bg-primary/20 px-2 py-1 rounded">
                                ✓ Active
                              </div>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">{p.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Color Schemes - Inline */}
                  <div className="border-t pt-4">
                    <Label className="text-sm font-medium mb-3 block">
                      Color Scheme 
                      <span className="text-muted-foreground font-normal ml-2">
                        (Auto-selected for {presets.find(p => p.id === preset)?.name})
                      </span>
                    </Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {colorSchemes.map((scheme) => (
                        <div
                          key={scheme.id}
                          className={`cursor-pointer rounded-lg border-2 p-2 transition-all ${
                            chosen.colorScheme === scheme.id
                              ? 'border-primary ring-2 ring-primary/20'
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => setChosen(c => ({ ...c, colorScheme: scheme.id }))}
                        >
                          <div
                            className="w-full h-8 rounded mb-1"
                            style={{ background: scheme.preview }}
                          />
                          <div className="text-xs font-medium">{scheme.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resume Upload */}
            <div>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">2. Upload Resume</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm">Resume file (PDF, DOC, DOCX)</Label>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="mt-1"
                    />
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription className="text-sm">{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting || !file}
                    className="w-full"
                  >
                    {isSubmitting ? 'Generating Portfolio...' : 'Generate Portfolio'}
                  </Button>

                  <p className="text-xs text-muted-foreground">
                    Resume parsed locally. Nothing stored until you save.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Section Templates - Compact Row with Auto-Selection Indicator */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">3. Section Templates</CardTitle>
              <CardDescription className="text-sm">
                Auto-configured for {presets.find(p => p.id === preset)?.name} preset. 
                <span className="text-primary ml-1">Customize if needed.</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {(['hero', 'about', 'skills', 'projects', 'contact']).map((section) => (
                  <div key={section}>
                    <Label className="text-sm capitalize mb-1 block flex items-center gap-2">
                      {section}
                      {presetConfigs[preset]?.templates[section] === chosen[section] && (
                        <span className="text-xs text-primary">✓ Auto</span>
                      )}
                    </Label>
                    <Select
                      value={chosen[section] || ''}
                      onValueChange={(val) => setChosen(c => ({ ...c, [section]: val }))}
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Choose template" />
                      </SelectTrigger>
                      <SelectContent>
                        {componentRegistry[section].variants.map((v) => (
                          <SelectItem key={v.id} value={v.id}>
                            {v.name}
                            {presetConfigs[preset]?.templates[section] === v.id && (
                              <span className="ml-2 text-primary">★</span>
                            )}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          </form>
        </div>
      </div>
    </div>
  );
}