export interface ComponentType {
  id: string;
  name: string;
  category: string;
  description?: string;
  icon?: string;
}

export interface PortfolioComponent {
  id: string;
  type: string;
  variant: string;
  props: Record<string, any>;
  styles: Record<string, any>;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PortfolioLayout {
  id: string;
  userId: string;
  name: string;
  components: PortfolioComponent[];
  theme: {
    colors: Record<string, string>;
    typography: Record<string, any>;
    spacing: Record<string, string>;
  };
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ComponentVariant {
  id: string;
  name: string;
  thumbnail: string;
  component: React.ComponentType<any>;
  defaultProps: Record<string, any>;
  styleOptions: Record<string, any>;
  requiredFields: string[];
}

export interface ComponentCategory {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  variants: Record<string, ComponentVariant>;
}
