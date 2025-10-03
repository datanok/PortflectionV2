'use client';

import React, { useState } from 'react';
import ContentEditor from '@/components/portfolio/builder/ContentEditor';

const PortfolioEditorDemo = () => {
  const [componentData, setComponentData] = useState({
    title: "JOHN DOE",
    subtitle: "Full Stack Developer", 
    description: "Passionate developer with experience building modern web applications and digital solutions.",
    profileImage: "",
    heroImage: "",
    showSocialLinks: true,
    socialLinks: [
      {
        platform: "GitHub",
        url: "https://github.com/johndoe",
        username: "@johndoe",
      },
      {
        platform: "LinkedIn", 
        url: "https://linkedin.com/in/johndoe",
        username: "@johndoe",
      },
    ],
  });

  const handleUpdate = (newData: any) => {
    setComponentData(newData);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Portfolio Editor with Memoji Integration
        </h1>
        <p className="text-gray-600">
          Try editing the image fields to see the memoji picker in action
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Content Editor
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg">
            <ContentEditor
              data={componentData}
              onUpdate={handleUpdate}
              componentType="hero"
              componentVariant="hero-section"
            />
          </div>
        </div>

        {/* Preview */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Live Preview
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            {/* Hero Preview */}
            <div className="text-center space-y-4">
              {componentData.profileImage && (
                <img
                  src={componentData.profileImage}
                  alt="Profile"
                  className="w-24 h-24 mx-auto rounded-full object-cover"
                />
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {componentData.title}
                </h1>
                <p className="text-lg text-gray-600">
                  {componentData.subtitle}
                </p>
                <p className="text-gray-700 mt-2">
                  {componentData.description}
                </p>
              </div>
              
              {componentData.heroImage && (
                <div className="mt-6">
                  <img
                    src={componentData.heroImage}
                    alt="Hero"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}

              {componentData.showSocialLinks && componentData.socialLinks && (
                <div className="flex justify-center gap-4 mt-6">
                  {componentData.socialLinks.map((link: any, index: number) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      {link.platform}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Data Preview */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Component Data
            </h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs font-mono overflow-auto max-h-64">
              <pre>{JSON.stringify(componentData, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          🎯 How to Test the Memoji Integration
        </h2>
        <div className="space-y-2 text-sm">
          <p><strong>1.</strong> Look for image fields like "Profile Image URL" or "Hero Image URL" in the editor</p>
          <p><strong>2.</strong> Click the "Memoji" button next to any image field</p>
          <p><strong>3.</strong> Choose between the "Memoji Collection" tab or "Image URL" tab</p>
          <p><strong>4.</strong> Select a memoji from the collection to automatically populate the field with an optimized Cloudinary URL</p>
          <p><strong>5.</strong> Or use the "Image URL" tab to paste your own image links</p>
          <p><strong>6.</strong> See the live preview update in real-time!</p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioEditorDemo;
