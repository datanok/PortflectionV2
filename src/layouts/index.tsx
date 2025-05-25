import React, { lazy, Suspense, ComponentType } from 'react';
import { LayoutType, LayoutProps } from '@/types/layout';
import { Skeleton } from '@/components/ui/skeleton';

// Type for dynamically imported layout components
type LazyLayoutComponent = React.LazyExoticComponent<ComponentType<LayoutProps>>;

// Lazy load layout components with proper typing
const layoutComponents: Record<LayoutType, LazyLayoutComponent> = {
  minimal: lazy(() => import('./MinimalLayout')),
  classic: lazy(() => import('./ClassicLayout')),
};

// Fallback component for loading
const LayoutLoading: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4 w-full max-w-2xl p-4">
        <Skeleton className="h-16 w-3/4 mx-auto" />
        <Skeleton className="h-8 w-1/2 mx-auto" />
        <Skeleton className="h-96 w-full" />
      </div>
    </div>
  );
};

// Layout factory component
export const PortfolioLayout: React.FC<LayoutProps & { layoutType?: LayoutType }> = ({
  layoutType = 'classic',
  ...props
}) => {
  const LayoutComponent = layoutComponents[layoutType] || layoutComponents.classic;
  console.log(layoutType,"layoutType")

  return (
    <Suspense fallback={<LayoutLoading />}>
      <LayoutComponent {...props} />
    </Suspense>
  );
};

// Re-export the layout components
export { default as ClassicLayout } from './ClassicLayout';
export { default as MinimalLayout } from './MinimalLayout';
