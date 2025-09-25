import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Portfolio Themes - Choose Your Perfect Design',
  description: 'Browse our collection of beautiful portfolio themes to showcase your work in style',
};

const themes = [
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple design that puts your content first',
    preview: '/themes/minimal-preview.png',
    colors: ['#2563eb', '#7c3aed', '#db2777'],
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Sleek and contemporary design with smooth animations',
    preview: '/themes/modern-preview.png',
    colors: ['#1e40af', '#4338ca', '#9d174d'],
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and artistic layout for showcasing visual work',
    preview: '/themes/creative-preview.png',
    colors: ['#7e22ce', '#0d9488', '#e11d48'],
  },
];

export default function ThemesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Portfolio Themes</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a theme that best represents your personal brand and style.
            Each theme is fully customizable to match your unique identity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {themes.map((theme) => (
            <div 
              key={theme.id}
              className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 bg-muted/20">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted/20 to-muted/40">
                  <span className="text-muted-foreground/50 text-lg font-medium">
                    {theme.name} Preview
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{theme.name}</h2>
                <p className="text-muted-foreground mb-4">{theme.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  {theme.colors.map((color, i) => (
                    <div 
                      key={i} 
                      className="w-6 h-6 rounded-full" 
                      style={{ backgroundColor: color }}
                      title={`Color ${i + 1}`}
                    />
                  ))}
                </div>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                >
                  Get Started with {theme.name}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Can&apos;t Decide?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            All themes are fully customizable, so you can always change your design later.
            Start with any theme and make it your own!
          </p>
          <Link
            href="/sign-up"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-6 py-2"
          >
            Create Your Portfolio Now
          </Link>
        </div>
      </div>
    </div>
  );
}
