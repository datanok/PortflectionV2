import {
  Github, Twitter, Linkedin, Instagram, Youtube,
  ExternalLink, Globe, Pen, Palette, Dribbble
} from "lucide-react";
import Link from "next/link";

interface SocialIconsProps {
  socials: {
    type: string;
    url: string;
    username: string;
  }[];
  className?: string;
  theme?: any;
}

export function SocialIcons({ socials, className, theme }: SocialIconsProps) {
  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'github':
        return <Github className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'youtube':
        return <Youtube className="h-5 w-5" />;
      case 'website':
        return <Globe className="h-5 w-5" />;
      case 'medium':
        return <Pen className="h-5 w-5" />;
      case 'behance':
        return <Palette className="h-5 w-5" />;
      case 'dribbble':
        return <Dribbble className="h-5 w-5" />;
      default:
        return <ExternalLink className="h-5 w-5" />;
    }
  };

  return (
    <div className={`flex gap-4 ${className}`}>
      {socials.map((social) => (
        <Link
          key={social.type}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: theme?.accent || theme?.secondary || '#4fd1c5',
          }}
          className="hover:text-foreground transition-colors"
          title={`${social.type}: ${social.username}`}
        >
          {getIcon(social.type)}
        </Link>
      ))}
    </div>
  );
}
