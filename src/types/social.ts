import { ComponentType } from 'react';

export type SocialIconType = 'github' | 'linkedin' | 'website' | 'twitter' | 'instagram' | 'facebook' | 'youtube' | 'medium';

export interface SocialIconProps {
  type: SocialIconType;
  url: string;
  theme: any;
  className?: string;
}

export type SocialLinks = Partial<Record<SocialIconType, string>>;
