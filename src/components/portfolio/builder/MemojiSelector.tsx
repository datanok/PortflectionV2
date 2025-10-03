'use client';

import React, { useState } from 'react';
import { Memoji } from '@/types/memoji';
import { getOptimizedMemojiUrl } from '@/lib/memoji-utils';
import SimpleMemojiPicker from '@/components/ui/SimpleMemojiPicker';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface MemojiSelectorProps {
  selectedMemoji?: Memoji | null;
  onMemojiChange: (memoji: Memoji | null) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

const MemojiSelector: React.FC<MemojiSelectorProps> = ({
  selectedMemoji = null,
  onMemojiChange,
  label = 'Profile Memoji',
  placeholder = 'Choose a memoji...',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMemojiSelect = (memoji: Memoji) => {
    onMemojiChange(memoji);
    setIsOpen(false);
  };

  const handleRemoveMemoji = () => {
    onMemojiChange(null);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className="flex items-center gap-3">
        {/* Current Selection Display */}
        <div className="flex-1">
          {selectedMemoji ? (
            <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-md bg-white">
              <img
                src={getOptimizedMemojiUrl(selectedMemoji.fileName, {
                  width: 40,
                  height: 40,
                  quality: 'auto',
                  format: 'auto'
                })}
                alt={selectedMemoji.name}
                className="w-10 h-10 rounded-md"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900 text-sm">
                  {selectedMemoji.name.replace('memoji_', 'Memoji ')}
                </div>
                <div className="text-xs text-gray-500 capitalize">
                  {selectedMemoji.category}
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRemoveMemoji}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Remove
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-md text-gray-500">
              <div className="text-center">
                <div className="text-2xl mb-2">🎭</div>
                <p className="text-sm">{placeholder}</p>
              </div>
            </div>
          )}
        </div>

        {/* Picker Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline">
              {selectedMemoji ? 'Change' : 'Choose'} Memoji
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Choose Your Memoji</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <SimpleMemojiPicker
                onSelect={handleMemojiSelect}
                selectedMemoji={selectedMemoji}
                className="border-0 shadow-none"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Preview Sizes */}
      {selectedMemoji && (
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <div className="text-sm font-medium text-gray-700 mb-2">
            Preview at different sizes:
          </div>
          <div className="flex items-center gap-4">
            {[24, 32, 48, 64].map(size => (
              <div key={size} className="text-center">
                <img
                  src={getOptimizedMemojiUrl(selectedMemoji.fileName, {
                    width: size,
                    height: size,
                    quality: 'auto',
                    format: 'auto'
                  })}
                  alt={`${selectedMemoji.name} ${size}px`}
                  className="rounded border bg-white"
                  style={{ width: size, height: size }}
                />
                <p className="text-xs text-gray-500 mt-1">{size}px</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MemojiSelector;
