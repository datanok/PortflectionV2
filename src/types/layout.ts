export type LayoutType = 'minimal' | 'classic';

export interface LayoutProps {
  isPreview?: boolean;
  children?: React.ReactNode;
}

// This will help TypeScript understand the layout component structure
export type LayoutComponent = React.ComponentType<LayoutProps>;
