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
      accent?: string; // Make sure this is included in your interface
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
        className="transition-colors duration-300"
        style={{ 
          color: theme?.primary,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = theme?.accent || theme?.primary || '';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = theme?.primary || 'red';
        }}
        aria-label={`${type} profile`}
      >
        {iconMap[type] || <FiExternalLink size={size} />}
      </a>
    );
  };
  
  export default SocialIcon;