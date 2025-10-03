import React from 'react';
import MinimalNavbar from '@/components/portfolio/sections/navbar/MinimalNavbar';
import MinimalHero from '@/components/portfolio/sections/hero/MinimalHero';

export default function MinimalThemeDemo() {
  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Navbar */}
      <MinimalNavbar
        logoText="<TP />"
        logoHref="#"
        navItems={[
          { label: "About", href: "#about" },
          { label: "Work", href: "#work" },
          { label: "Testimonials", href: "#testimonials" },
          { label: "Contact", href: "#contact" },
        ]}
        ctaText="Download CV"
        ctaHref="/resume.pdf"
        showCTA={true}
        backgroundColor="#ffffff"
        textColor="#1f2937"
        primaryColor="#3b82f6"
        secondaryColor="#6b7280"
        borderColor="#e5e7eb"
        paddingY="16"
        paddingX="24"
        fontSize="base"
        fontWeight="medium"
        fontFamily="Inter, system-ui, sans-serif"
        isFixed={true}
        showBorder={true}
      />

      {/* Minimal Hero */}
      <MinimalHero
        title="Hi, I'm Tanmay 👋"
        subtitle="Full Stack Developer"
        description="I'm a full stack developer passionate about creating exceptional digital experiences that are fast, accessible, visually appealing, and responsive. Even though I have been creating web applications for over 7 years, I still love it as if it was something new."
        profileImage="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
        showSocialLinks={true}
        socialLinks={[
          {
            platform: "GitHub",
            url: "https://github.com/tanmaypatil",
            username: "@tanmaypatil",
          },
          {
            platform: "LinkedIn",
            url: "https://linkedin.com/in/tanmaypatil",
            username: "@tanmaypatil",
          },
          {
            platform: "Twitter",
            url: "https://twitter.com/tanmaypatil",
            username: "@tanmaypatil",
          },
          {
            platform: "Email",
            url: "mailto:tanmay@example.com",
            username: "tanmay@example.com",
          },
        ]}
        backgroundColor="#ffffff"
        textColor="#1f2937"
        primaryColor="#3b82f6"
        secondaryColor="#6b7280"
        paddingY="80"
        paddingX="16"
        textAlign="center"
        fontSize="base"
        fontWeight="normal"
        fontFamily="Inter, system-ui, sans-serif"
      />

      {/* Demo Information */}
      <section className="py-16 px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Minimal Theme Components
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                MinimalNavbar
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Clean typography with Inter font</li>
                <li>• Responsive mobile menu</li>
                <li>• Smooth scroll effects</li>
                <li>• Customizable CTA button</li>
                <li>• Fixed positioning option</li>
                <li>• Backdrop blur on scroll</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                MinimalHero
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Centered layout design</li>
                <li>• Circular profile image</li>
                <li>• Social media icons</li>
                <li>• Responsive typography</li>
                <li>• Memoji support ready</li>
                <li>• Clean spacing and alignment</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              🎨 Design Features
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-800">
              <div>
                <strong>Typography:</strong> Clean, readable fonts with proper hierarchy
              </div>
              <div>
                <strong>Colors:</strong> Subtle grays with blue accents
              </div>
              <div>
                <strong>Layout:</strong> Centered, spacious, and minimal
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              These components are now available in the Portfolio Builder!
            </p>
            <a
              href="/demo/portfolio-editor"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try in Portfolio Builder
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
