'use client';

import React, { useState } from 'react';
import { Memoji } from '@/types/memoji';
import { getOptimizedMemojiUrl } from '@/lib/memoji-utils';
import SimpleMemojiPicker from '@/components/ui/SimpleMemojiPicker';
import MemojiPicker from '@/components/ui/MemojiPicker';

const MemojiPickerDemo: React.FC = () => {
  const [selectedMemoji, setSelectedMemoji] = useState<Memoji | null>(null);
  const [pickerType, setPickerType] = useState<'simple' | 'advanced'>('simple');

  const handleMemojiSelect = (memoji: Memoji) => {
    setSelectedMemoji(memoji);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Memoji Picker Demo
        </h1>
        <p className="text-gray-600">
          Choose from our collection of optimized memojis powered by Cloudinary
        </p>
      </div>

      {/* Picker Type Toggle */}
      <div className="flex justify-center">
        <div className="bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setPickerType('simple')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              pickerType === 'simple'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Simple Picker
          </button>
          <button
            onClick={() => setPickerType('advanced')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              pickerType === 'advanced'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Advanced Picker
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Picker */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {pickerType === 'simple' ? 'Simple' : 'Advanced'} Memoji Picker
          </h2>
          {pickerType === 'simple' ? (
            <SimpleMemojiPicker
              onSelect={handleMemojiSelect}
              selectedMemoji={selectedMemoji}
              className="w-full"
            />
          ) : (
            <MemojiPicker
              onSelect={handleMemojiSelect}
              selectedMemoji={selectedMemoji}
              className="w-full"
              showSearch={true}
              showCategories={true}
              maxHeight="600px"
              gridCols={5}
            />
          )}
        </div>

        {/* Selected Memoji Display */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Selected Memoji
          </h2>
          
          {selectedMemoji ? (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              {/* Large Preview */}
              <div className="text-center mb-6">
                <img
                  src={getOptimizedMemojiUrl(selectedMemoji.fileName, {
                    width: 200,
                    height: 200,
                    quality: 'auto',
                    format: 'auto'
                  })}
                  alt={selectedMemoji.name}
                  className="w-32 h-32 mx-auto rounded-lg shadow-sm"
                />
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {selectedMemoji.name.replace('memoji_', 'Memoji ')}
                  </h3>
                  <p className="text-gray-600 capitalize">
                    Category: {selectedMemoji.category}
                  </p>
                </div>

                {/* Tags */}
                {selectedMemoji.tags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Tags:</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedMemoji.tags.slice(0, 10).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                      {selectedMemoji.tags.length > 10 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                          +{selectedMemoji.tags.length - 10} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Metadata */}
                <div className="text-sm text-gray-500 space-y-1">
                  <p>ID: {selectedMemoji.id}</p>
                  <p>File: {selectedMemoji.fileName}</p>
                  {selectedMemoji.faceCount > 0 && (
                    <p>Faces detected: {selectedMemoji.faceCount}</p>
                  )}
                  {selectedMemoji.personCount > 0 && (
                    <p>People detected: {selectedMemoji.personCount}</p>
                  )}
                  {selectedMemoji.genderClues.length > 0 && (
                    <p>Gender clues: {selectedMemoji.genderClues.join(', ')}</p>
                  )}
                </div>

                {/* Different Sizes Preview */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Available Sizes (Cloudinary Optimized):
                  </h4>
                  <div className="flex items-center gap-4">
                    {[40, 60, 80, 120].map(size => (
                      <div key={size} className="text-center">
                        <img
                          src={getOptimizedMemojiUrl(selectedMemoji.fileName, {
                            width: size,
                            height: size,
                            quality: 'auto',
                            format: 'auto'
                          })}
                          alt={`${selectedMemoji.name} ${size}px`}
                          className="rounded border"
                          style={{ width: size, height: size }}
                        />
                        <p className="text-xs text-gray-500 mt-1">{size}px</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Usage Example */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Usage Example:
                  </h4>
                  <div className="bg-gray-50 p-3 rounded-md text-xs font-mono text-gray-700 overflow-x-auto">
                    {`const memojiUrl = getOptimizedMemojiUrl('${selectedMemoji.fileName}', {
  width: 100,
  height: 100,
  quality: 'auto',
  format: 'webp'
});`}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <div className="text-4xl mb-4">🎭</div>
              <p className="text-gray-500">
                Select a memoji from the picker to see details
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Features List */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          ✨ Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Cloudinary optimization with automatic format selection</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Real-time search and filtering</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Category-based organization</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Tag-based filtering</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Lazy loading for performance</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Responsive grid layouts</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>TypeScript support</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Debounced search for smooth UX</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemojiPickerDemo;
