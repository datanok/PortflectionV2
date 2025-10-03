'use client';

import React, { useState } from 'react';
import { Memoji } from '@/types/memoji';
import { getOptimizedMemojiUrl } from '@/lib/memoji-utils';
import MemojiSelector from '@/components/portfolio/builder/MemojiSelector';

const MemojiUsageExample: React.FC = () => {
  const [profileMemoji, setProfileMemoji] = useState<Memoji | null>(null);
  const [heroMemoji, setHeroMemoji] = useState<Memoji | null>(null);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Memoji Integration Example
        </h1>
        <p className="text-gray-600">
          See how to integrate memoji selection into your portfolio builder
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Example */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Portfolio Form Integration
          </h2>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
            <MemojiSelector
              selectedMemoji={profileMemoji}
              onMemojiChange={setProfileMemoji}
              label="Profile Picture"
              placeholder="Select your profile memoji"
            />

            <MemojiSelector
              selectedMemoji={heroMemoji}
              onMemojiChange={setHeroMemoji}
              label="Hero Section Memoji"
              placeholder="Choose a memoji for your hero section"
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us about yourself..."
              />
            </div>

            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
              Save Profile
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Live Preview
          </h2>
          
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Hero Section Preview */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white text-center">
              {heroMemoji ? (
                <img
                  src={getOptimizedMemojiUrl(heroMemoji.fileName, {
                    width: 120,
                    height: 120,
                    quality: 'auto',
                    format: 'auto'
                  })}
                  alt="Hero memoji"
                  className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/20 p-2"
                />
              ) : (
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-2xl">🎭</span>
                </div>
              )}
              <h1 className="text-2xl font-bold mb-2">John Doe</h1>
              <p className="text-blue-100">Full Stack Developer</p>
            </div>

            {/* Profile Section Preview */}
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                {profileMemoji ? (
                  <img
                    src={getOptimizedMemojiUrl(profileMemoji.fileName, {
                      width: 64,
                      height: 64,
                      quality: 'auto',
                      format: 'auto'
                    })}
                    alt="Profile memoji"
                    className="w-16 h-16 rounded-full"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xl">👤</span>
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">About Me</h3>
                  <p className="text-gray-600">Get to know me better</p>
                </div>
              </div>
              <p className="text-gray-700">
                Passionate developer with experience building modern web applications...
              </p>
            </div>
          </div>

          {/* Code Example */}
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <div className="text-sm font-mono">
              <div className="text-green-400 mb-2">// Usage Example</div>
              <div className="text-blue-400">import</div> {`{ MemojiSelector }`} <div className="text-blue-400">from</div> <div className="text-yellow-300">'@/components/portfolio/builder/MemojiSelector'</div>;
              <br /><br />
              <div className="text-purple-400">const</div> ProfileForm = () => {`{`}
              <br />
              &nbsp;&nbsp;<div className="text-purple-400">const</div> [memoji, setMemoji] = useState&lt;Memoji | null&gt;(null);
              <br /><br />
              &nbsp;&nbsp;<div className="text-blue-400">return</div> (
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;MemojiSelector
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;selectedMemoji={`{memoji}`}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onMemojiChange={`{setMemoji}`}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label=<div className="text-yellow-300">"Profile Picture"</div>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;/&gt;
              <br />
              &nbsp;&nbsp;);
              <br />
              {`};`}
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          🚀 Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900">Performance</h3>
            <ul className="space-y-1 text-gray-600">
              <li>• Cloudinary optimization</li>
              <li>• Lazy loading</li>
              <li>• Image caching</li>
              <li>• Debounced search</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900">User Experience</h3>
            <ul className="space-y-1 text-gray-600">
              <li>• Real-time search</li>
              <li>• Category filtering</li>
              <li>• Responsive design</li>
              <li>• Keyboard navigation</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900">Developer Friendly</h3>
            <ul className="space-y-1 text-gray-600">
              <li>• TypeScript support</li>
              <li>• Easy integration</li>
              <li>• Customizable UI</li>
              <li>• Well documented</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemojiUsageExample;
