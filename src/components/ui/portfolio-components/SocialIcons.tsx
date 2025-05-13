// SocialIcon.tsx
import {
    FiGithub, FiLinkedin, FiTwitter, FiInstagram,
    FiYoutube, FiExternalLink
  } from 'react-icons/fi';
  import { FaDribbble, FaBehance, FaMedium } from 'react-icons/fa';
  import { RxLink2 } from 'react-icons/rx';
  
  interface SocialIconProps {
    type: string;
    url: string;
    size?: number;
    theme?: {
      primary?: string;
      accent?: string; 
      background?: string;
      muted?: string;
      body?: string;
      fontBody?: string;

    };
  }
  
  const SocialIcon = ({ type, url, size = 20, theme }: SocialIconProps) => {
    const iconMap: Record<string,  React.ReactNode> = {
      github: <FiGithub size={size} />,
      linkedin: <FiLinkedin size={size} />,
      twitter: <FiTwitter size={size} />,
      instagram: <FiInstagram size={size} />,
      dribbble: <FaDribbble size={size} />,
      behance: <FaBehance size={size} />,
      youtube: <FiYoutube size={size} />,
      medium: <FaMedium size={size} />,
      website: <RxLink2 size={size} />
    };
  
    if (!url) return null;
  
    return (
      <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
      style={{ 
        backgroundColor: theme?.background,
        color: theme?.primary,
        backdropFilter: 'blur(8px)',
        border: `1px solid ${theme?.primary}50`
      }}
    >
      {iconMap[type] || <FiExternalLink size={size} />}
    </a>
    );
  };
  
  export default SocialIcon;