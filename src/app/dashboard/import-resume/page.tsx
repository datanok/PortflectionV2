"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { savePortfolio } from "@/actions/portfolio-actions";
import {
  mapWithRegistry,
  ResumeJson,
  Preset,
} from "@/lib/resumeMapper";
import { componentRegistry } from "@/lib/portfolio/registry";
import { colorSchemes, getDefaultColorScheme } from "@/lib/colorSchemes";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
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
        preview: "https://placehold.co/640x360/fffef7/111111?text=Brutalist+Preview",
      },
      {
        id: "typography",
        name: "Typography",
        description: "Clean, developer-centric, monospace aesthetic",
        accent: "var(--accent)",
        preview: "https://placehold.co/640x360/f8fafc/0f172a?text=Typography+Preview",
      },
    ],
    []
  );

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
        throw new Error(`Parser error (${res.status})`);
      }

      const resumeJson = (await res.json()) as ResumeJson;
      const draft = mapWithRegistry(resumeJson, chosen);
      const result = await savePortfolio(draft);
      router.push(`/dashboard/portfolios/edit/${result.data.id}`);
    } catch (err: any) {
      setError(err?.message || "Failed to import resume");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[--background] text-[--foreground]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-md border px-3 py-1 bg-[--accent] text-xs font-bold uppercase">
            <span>Import</span>
            <span>Resume</span>
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl font-black">
            Create a Portfolio from Your Resume
          </h1>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            Choose a premium preset, upload your resume (PDF/DOC/DOCX), and we’ll generate a fully-editable portfolio for you in seconds.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
          {/* Preset Selection */}
          <section>
            <h2 className="text-xl font-extrabold mb-3">1. Select a Preset</h2>
            <div className="grid grid-cols-1 gap-4">
              {presets.map((p) => (
                <Card
                  key={p.id}
                  className={`cursor-pointer border-2 ${
                    preset === p.id
                      ? "ring-2 ring-[--primary]"
                      : "hover:ring-1 hover:ring-[--border]"
                  }`}
                  onClick={() => setPreset(p.id as Preset)}
                >
                  <CardHeader>
                    <img
                      src={p.preview}
                      alt={p.name}
                      className="w-full aspect-video object-cover rounded"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <CardTitle>{p.name}</CardTitle>
                      <span
                        className="px-2 py-0.5 text-xs font-bold rounded"
                        style={{ backgroundColor: p.accent, color: "var(--primary-foreground)" }}
                      >
                        Premium
                      </span>
                    </div>
                    <CardDescription>{p.description}</CardDescription>
                    {preset === p.id && (
                      <span className="mt-2 inline-block text-xs font-bold text-[--primary]">
                        Selected
                      </span>
                    )}
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Color Scheme Selection */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Color Scheme</CardTitle>
                <CardDescription>Choose a color theme for your portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {colorSchemes.map((scheme) => (
                    <div
                      key={scheme.id}
                      className={`cursor-pointer rounded-lg border-2 p-3 transition-all ${
                        chosen.colorScheme === scheme.id
                          ? "ring-2 ring-[--primary] border-[--primary]"
                          : "hover:ring-1 hover:ring-[--border]"
                      }`}
                      onClick={() => setChosen((c) => ({ ...c, colorScheme: scheme.id }))}
                    >
                      <div
                        className="w-full h-12 rounded mb-2"
                        style={{ background: scheme.preview }}
                      />
                      <div className="text-sm font-medium">{scheme.name}</div>
                      <div className="text-xs text-muted-foreground">{scheme.description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Section Template Selectors */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Templates per Section</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {(["hero", "about", "skills", "projects", "contact"] as const).map((section) =>
                  componentRegistry[section].variants.length > 0 ? (
                    <div key={section}>
                      <Label className="mb-1">{section.charAt(0).toUpperCase() + section.slice(1)}</Label>
                      <Select
                        value={chosen[section] || ""}
                        onValueChange={(val) =>
                          setChosen((c) => ({ ...c, [section]: val || undefined }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose template" />
                        </SelectTrigger>
                        <SelectContent>
                          {componentRegistry[section].variants.map((v) => (
                            <SelectItem key={v.id} value={v.id}>
                              {v.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ) : null
                )}
              </CardContent>
            </Card>
          </section>

          {/* Resume Upload */}
          <section>
            <h2 className="text-xl font-extrabold mb-3">2. Upload Your Resume</h2>
            <Card>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <Label>Resume file (PDF, DOC, DOCX)</Label>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting || !file}
                  className="w-full bg-[--primary] text-[--primary-foreground] hover:opacity-90"
                >
                  {isSubmitting ? "Generating Portfolio…" : "Generate Portfolio"}
                </Button>

                <p className="text-xs text-muted-foreground">
                  By continuing you agree that your resume will be parsed locally and transformed into a draft portfolio layout. Nothing is stored until you save.
                </p>
              </CardContent>
            </Card>
          </section>
        </form>
      </div>
    </div>
  );
}
