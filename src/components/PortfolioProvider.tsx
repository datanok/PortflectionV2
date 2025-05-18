'use client';

import { createContext, useContext, ReactNode } from 'react';
import { 
  PortfolioFormData,
  DeveloperPortfolioFormData,
  DesignerPortfolioFormData,
  ContentCreatorPortfolioFormData,
  BusinessConsultingPortfolioFormData
} from './portfolioForms/types/portfolio';
// Union type that can be any portfolio type
export type PortfolioData = 
  | PortfolioFormData
  | DeveloperPortfolioFormData 
  | DesignerPortfolioFormData 
  | ContentCreatorPortfolioFormData 
  | BusinessConsultingPortfolioFormData;

// Type guard helpers
export function isDeveloperPortfolio(data: PortfolioData): data is DeveloperPortfolioFormData {
  return 'skills' in data && Array.isArray(data.skills) && 'portfolioItems' in data;
}

export function isDesignerPortfolio(data: PortfolioData): data is DesignerPortfolioFormData {
  return 'tools' in data && 'portfolioItems' in data && Array.isArray(data.portfolioItems);
}

export function isContentCreatorPortfolio(data: PortfolioData): data is ContentCreatorPortfolioFormData {
  return 'specialties' in data && 'portfolioItems' in data;
}

export function isBusinessConsultantPortfolio(data: PortfolioData): data is BusinessConsultingPortfolioFormData {
  return 'portfolioItems' in data && 'skills' in data && Array.isArray(data.skills);
}

// Create the context with initial undefined value
const PortfolioContext = createContext<PortfolioData | undefined>(undefined);

interface PortfolioDataProviderProps {
  children: ReactNode;
  value: PortfolioData;
}

// Enhanced provider component with type checking
export function PortfolioDataProvider({ 
  children, 
  value,
}: PortfolioDataProviderProps) {
  // Runtime validation could be added here if needed
  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

// Custom hook to use the portfolio data with type safety
export function usePortfolioData() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolioData must be used within a PortfolioDataProvider');
  }
  return context;
}

// Typed hooks for specific portfolio types
export function useDeveloperPortfolioData() {
  const data = usePortfolioData();
  if (!isDeveloperPortfolio(data)) {
    throw new Error('This hook can only be used with developer portfolio data');
  }
  return data;
}

export function useDesignerPortfolioData() {
  const data = usePortfolioData();
  if (!isDesignerPortfolio(data)) {
    throw new Error('This hook can only be used with designer portfolio data');
  }
  return data;
}

export function useContentCreatorPortfolioData() {
  const data = usePortfolioData();
  if (!isContentCreatorPortfolio(data)) {
    throw new Error('This hook can only be used with content creator portfolio data');
  }
  return data;
}

export function useBusinessConsultantPortfolioData() {
  const data = usePortfolioData();
  if (!isBusinessConsultantPortfolio(data)) {
    throw new Error('This hook can only be used with business consultant portfolio data');
  }
  return data;
}