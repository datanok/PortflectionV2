"use client";
import React, { useState } from 'react';
import { ArrowRight, Upload, Sparkles, Globe, FileText, Zap, Check, Play } from 'lucide-react';

const FeatureShowcase = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: Upload,
      title: "Upload & Customize",
      description: "Upload your resume and choose your template & colors",
      preview: "resume-preview"
    },
    {
      icon: Sparkles,
      title: "AI Parsing",
      description: "Our AI reads and extracts content from your resume",
      preview: "ai-processing"
    },
    {
      icon: Globe,
      title: "Portfolio Ready",
      description: "Get a stunning portfolio website instantly",
      preview: "portfolio-preview"
    }
  ];

  return (
    <div className="relative py-24 px-6 bg-gradient-to-br from-background via-card to-secondary/20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-brand/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-brand/10 text-brand px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            New Feature
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            From Resume to
            <span className="bg-gradient-to-r from-brand to-primary bg-clip-text text-transparent block">
              Portfolio Website
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Upload your resume, choose a template and colors, then let our AI parse your content 
            to instantly create a stunning portfolio website. No coding required.
          </p>
        </div>

        {/* Interactive Process Showcase */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Steps */}
            <div className="space-y-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = activeStep === index;
                
                return (
                  <div
                    key={index}
                    className={`relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer group ${
                      isActive 
                        ? 'bg-card border-brand shadow-lg shadow-brand/10' 
                        : 'bg-card/50 border-border hover:border-brand/30'
                    }`}
                    onClick={() => setActiveStep(index)}
                    onMouseEnter={() => setActiveStep(index)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-brand text-brand-foreground' 
                          : 'bg-muted text-muted-foreground group-hover:bg-brand/10 group-hover:text-brand'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                      {isActive && (
                        <div className="w-6 h-6 bg-brand rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-brand-foreground" />
                        </div>
                      )}
                    </div>
                    
                    {/* Step number */}
                    <div className="absolute -left-3 top-8 w-6 h-6 bg-background border-2 border-border rounded-full flex items-center justify-center text-sm font-semibold text-muted-foreground">
                      {index + 1}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Preview Area */}
            <div className="relative">
              <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
                <div className="space-y-4">
                  {/* Mock browser window */}
                  <div className="flex items-center gap-2 pb-4 border-b border-border">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex-1 text-center">
                      <div className="inline-flex items-center gap-2 bg-muted px-3 py-1 rounded-lg text-sm text-muted-foreground">
                        <Globe className="w-4 h-4" />
                        yourname.portfolio.com
                      </div>
                    </div>
                  </div>
                  
                  {/* Dynamic content based on active step */}
                  <div className="min-h-80 flex items-center justify-center">
                    {activeStep === 0 && (
                      <div className="w-full space-y-6 animate-in fade-in duration-500">
                        {/* Upload Area */}
                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 bg-brand/10 rounded-xl mx-auto flex items-center justify-center">
                            <FileText className="w-8 h-8 text-brand" />
                          </div>
                          <p className="text-sm text-muted-foreground">Resume uploaded ✓</p>
                        </div>
                        
                        {/* Template Selection */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium text-foreground">Choose Template</h4>
                          <div className="grid grid-cols-3 gap-2">
                            {['Modern', 'Classic', 'Creative'].map((template, idx) => (
                              <div key={template} className={`p-2 rounded-lg border text-xs text-center transition-all cursor-pointer ${
                                idx === 0 ? 'border-brand bg-brand/5 text-brand' : 'border-border hover:border-brand/30'
                              }`}>
                                {template}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Color Selection */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-medium text-foreground">Pick Colors</h4>
                          <div className="flex gap-2 justify-center">
                            {[
                              'bg-red-500',
                              'bg-blue-500', 
                              'bg-green-500',
                              'bg-purple-500',
                              'bg-orange-500'
                            ].map((color, idx) => (
                              <div key={idx} className={`w-8 h-8 rounded-full cursor-pointer transition-all ${color} ${
                                idx === 0 ? 'ring-2 ring-offset-2 ring-brand' : 'hover:scale-110'
                              }`}></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {activeStep === 1 && (
                      <div className="text-center space-y-4 animate-in fade-in duration-500">
                        <div className="w-24 h-24 bg-primary/10 rounded-2xl mx-auto flex items-center justify-center">
                          <Zap className="w-12 h-12 text-primary animate-pulse" />
                        </div>
                        <p className="text-muted-foreground">AI parsing your resume content</p>
                        <div className="w-full max-w-xs h-2 bg-muted rounded-full mx-auto">
                          <div className="h-2 bg-primary rounded-full w-2/3 transition-all duration-1000"></div>
                        </div>
                      </div>
                    )}
                    
                    {activeStep === 2 && (
                      <div className="w-full animate-in fade-in duration-500">
                        {/* Mini portfolio preview */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-brand to-primary rounded-full"></div>
                            <div>
                              <div className="w-24 h-3 bg-foreground rounded mb-1"></div>
                              <div className="w-32 h-2 bg-muted-foreground rounded"></div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="h-20 bg-gradient-to-br from-brand/5 to-primary/5 rounded-lg border border-brand/20"></div>
                            <div className="h-20 bg-gradient-to-br from-primary/5 to-brand/5 rounded-lg border border-primary/20"></div>
                          </div>
                          <div className="space-y-2">
                            <div className="w-full h-2 bg-muted rounded"></div>
                            <div className="w-4/5 h-2 bg-muted rounded"></div>
                            <div className="w-3/5 h-2 bg-muted rounded"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Sparkles,
              title: "Smart Content Parsing",
              description: "AI reads your resume and extracts all relevant information accurately"
            },
            {
              icon: Zap,
              title: "Instant Generation",
              description: "Get your portfolio website ready in seconds, not hours or days"
            },
            {
              icon: Globe,
              title: "Professional Design",
              description: "Beautiful, responsive templates that look great on any device"
            }
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="group p-6 bg-card border border-border rounded-xl hover:border-brand/30 transition-all duration-300">
                <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors">
                  <Icon className="w-6 h-6 text-brand" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button
            className="group inline-flex items-center gap-3 bg-brand hover:bg-brand/90 text-brand-foreground px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-brand/25"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Play className="w-5 h-5" />
            Try It Now
            <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
          </button>
          <p className="text-sm text-muted-foreground mt-4">
            Free to try • No credit card required • Takes less than 30 seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureShowcase;
