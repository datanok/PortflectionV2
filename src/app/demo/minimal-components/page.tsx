import React from 'react';
import MinimalTestimonial from '@/components/portfolio/sections/testimonials/MinimalTestimonial';
import MinimalContact from '@/components/portfolio/sections/contact/MinimalContact';

export default function MinimalComponentsDemo() {
  return (
    <div className="min-h-screen">
      {/* Minimal Testimonial Component */}
      <MinimalTestimonial
        title="Proof in Praise"
        subtitle="TESTIMONIALS"
        testimonials={[
          {
            id: 1,
            name: "Sarah Johnson",
            role: "Product Manager",
            company: "TechCorp",
            content: "Working with this developer was an absolute pleasure. They delivered high-quality code on time and exceeded our expectations. Their attention to detail and problem-solving skills are exceptional.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
            featured: true,
          },
          {
            id: 2,
            name: "Michael Chen",
            role: "CTO",
            company: "StartupXYZ",
            content: "Incredible technical expertise and great communication skills. They helped us build a scalable solution that has been running smoothly for months. Highly recommended!",
            rating: 5,
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          },
          {
            id: 3,
            name: "Emily Rodriguez",
            role: "Design Lead",
            company: "Creative Agency",
            content: "Perfect collaboration between design and development. They understood our vision and brought it to life with pixel-perfect precision. A true professional!",
            rating: 5,
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          },
        ]}
        backgroundColor="#f9fafb"
        textColor="#111827"
        primaryColor="#2563eb"
        secondaryColor="#6b7280"
        paddingY="64"
        paddingX="16"
        textAlign="center"
        fontSize="base"
        fontWeight="normal"
        fontFamily="Inter, system-ui, sans-serif"
        borderRadius="24"
        shadow="0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      />

      {/* Minimal Contact Component */}
      <MinimalContact
        title="Let's Work Together"
        subtitle="Ready to start your next project?"
        description="I'm always interested in new opportunities and collaborations. Whether you have a project in mind or just want to chat about technology, feel free to reach out!"
        contactMethods={[
          {
            type: "email",
            label: "Email",
            value: "hello@example.com",
            href: "mailto:hello@example.com",
          },
          {
            type: "phone",
            label: "Phone",
            value: "+1 (555) 123-4567",
            href: "tel:+15551234567",
          },
          {
            type: "location",
            label: "Location",
            value: "San Francisco, CA",
            href: "https://maps.google.com/?q=San Francisco, CA",
          },
        ]}
        socialLinks={[
          {
            platform: "LinkedIn",
            url: "https://linkedin.com/in/johndoe",
            username: "@johndoe",
          },
          {
            platform: "GitHub",
            url: "https://github.com/johndoe",
            username: "@johndoe",
          },
        ]}
        showContactForm={true}
        showQRCode={false}
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
        borderRadius="12"
        shadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
      />

      {/* Demo Information */}
      <section className="py-16 px-8 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Minimal Components - Registry Integrated
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                MinimalTestimonial
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Interactive drag/swipe carousel</li>
                <li>• Configurable colors and styling</li>
                <li>• Dynamic testimonials from registry</li>
                <li>• Responsive design with animations</li>
                <li>• Card-based layout with profile images</li>
                <li>• Navigation dots with hover effects</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                MinimalContact
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Working contact form with validation</li>
                <li>• Dynamic contact methods</li>
                <li>• Social media integration</li>
                <li>• QR code support (optional)</li>
                <li>• Responsive two-column layout</li>
                <li>• Configurable styling and colors</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              🎨 Registry Integration Features
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-800">
              <div>
                <strong>Props Schema:</strong> Full form builder integration with proper field types
              </div>
              <div>
                <strong>Default Styles:</strong> Configurable colors, spacing, and typography
              </div>
              <div>
                <strong>Dynamic Data:</strong> No hardcoded content - all from registry defaults
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              These components are now fully integrated with the Portfolio Builder!
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
