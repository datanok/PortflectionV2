import dynamic from 'next/dynamic';
import { ComponentMetadata } from './componentRegistry';

export interface LoadedComponent {
  Component: React.ComponentType<any>;
  metadata: ComponentMetadata;
}

// Cache for loaded components
const componentCache = new Map<string, LoadedComponent>();

// Load a component dynamically
export async function loadComponent(componentId: string): Promise<LoadedComponent> {
  // Check cache first
  if (componentCache.has(componentId)) {
    return componentCache.get(componentId)!;
  }
  
  // Get component metadata
  const { getComponentMetadata, isComponentConvertedToFile } = await import('./componentRegistry');
  const metadata = await getComponentMetadata(componentId);
  
  if (!metadata) {
    throw new Error(`Component not found: ${componentId}`);
  }
  
  let Component: React.ComponentType<any>;
  
  // Check if component has been converted to a file
  const isConverted = await isComponentConvertedToFile(componentId);
  
  if (isConverted) {
    // Load from file (new system)
    Component = dynamic(
      () => import(`@/components/community/${metadata.name.replace(/[^a-zA-Z0-9]/g, '')}`),
      {
        ssr: false,
        loading: () => (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 bo