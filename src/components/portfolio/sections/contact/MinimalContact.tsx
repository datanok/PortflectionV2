import React from "react";

// Icon components
const MailIcon = ({ size = 20, color = "#000" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const PhoneIcon = ({ size = 20, color = "#000" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const LocationIcon = ({ size = 20, color = "#000" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const LinkedInIcon = ({ size = 20, color = "#000" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const GitHubIcon = ({ size = 20, color = "#000" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

interface ContactMethod {
  type: "email" | "phone" | "location";
  label: string;
  value: string;
  href: string;
}

interface SocialLink {
  platform: string;
  url: string;
  username: string;
}

interface MinimalContactProps {
  title?: string;
  subtitle?: string;
  description?: string;
  contactMethods?: ContactMethod[];
  socialLinks?: SocialLink[];
  showContactForm?: boolean;
  showQRCode?: boolean;
  qrCodeUrl?: string;
  profileImage?: string;
  resumeUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  cardBackgroundColor?: string;
  paddingY?: string;
  paddingX?: string;
  textAlign?: "left" | "center" | "right";
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  borderRadius?: string;
  shadow?: string;
}

const MinimalContact: React.FC<MinimalContactProps> = ({
  title = "Let's Work Together",
  subtitle = "Ready to start your next project?",
  description = "I'm always interested in new opportunities and collaborations. Whether you have a project in mind or just want to chat about technology, feel free to reach out!",
  contactMethods = [
    {
      type: "email",
      label: "Email",
      value: "hello@example.com",
      href: "mailto:hello@example.com",
    },
    {
      type: "phone",
      label: "Phone",
      value: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      type: "location",
      label: "Location",
      value: "San Francisco, CA",
      href: "https://maps.google.com/?q=San Francisco, CA",
    },
  ],
  socialLinks = [
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/johndoe",
      username: "@johndoe",
    },
    {
      platform: "GitHub",
      url: "https://github.com/johndoe",
      username: "@johndoe",
    },
  ],
  showContactForm = false,
  showQRCode = true,
  qrCodeUrl = "",
  profileImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  resumeUrl = "/resume.pdf",
  backgroundColor = "#ffffff",
  textColor = "#1f2937",
  primaryColor = "#3b82f6",
  secondaryColor = "#6b7280",
  cardBackgroundColor = "#ffffff",
  paddingY = "80",
  paddingX = "16",
  textAlign = "center",
  fontSize = "base",
  fontWeight = "normal",
  fontFamily = "Inter, system-ui, sans-serif",
  borderRadius = "12",
  shadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
}) => {
  const getSocialIcon = (platform: string) => {
    const iconProps = { size: 20, color: secondaryColor };
    
    switch (platform.toLowerCase()) {
      case "linkedin":
        return <LinkedInIcon {...iconProps} />;
      case "github":
        return <GitHubIcon {...iconProps} />;
      default:
        return <div className="w-5 h-5 bg-gray-400 rounded" />;
    }
  };

  const sectionStyle = {
    backgroundColor,
    color: textColor,
    paddingTop: `${paddingY}px`,
    paddingBottom: `${paddingY}px`,
    paddingLeft: `${paddingX}px`,
    paddingRight: `${paddingX}px`,
    textAlign: textAlign as any,
    fontFamily,
    fontSize: fontSize === "base" ? "16px" : fontSize,
    fontWeight,
  };

  return (
    <section style={sectionStyle}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: textColor }}
          >
            {title}
          </h2>
          {subtitle && (
            <p 
              className="text-lg md:text-xl mb-6"
              style={{ color: secondaryColor }}
            >
              {subtitle}
            </p>
          )}
          {description && (
            <p 
              className="text-base md:text-lg max-w-2xl mx-auto"
              style={{ color: secondaryColor }}
            >
              {description}
            </p>
          )}
        </div>

        <div className="w-full max-w-md mx-auto">
          {/* Email Card */}
          <div 
            className="rounded-2xl shadow-lg p-6 mb-4 hover:shadow-xl transition-shadow"
            style={{ backgroundColor: cardBackgroundColor }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="w-20 h-20 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${primaryColor}20` }}
              >
                <div className="relative">
                  {/* Mailbox Icon */}
                  <div 
                    className="w-12 h-14 rounded-sm"
                    style={{ backgroundColor: secondaryColor }}
                  ></div>
                  <div 
                    className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-10 rounded-sm border-2"
                    style={{ 
                      backgroundColor: cardBackgroundColor,
                      borderColor: `${secondaryColor}60`
                    }}
                  ></div>
                  <div 
                    className="absolute -right-2 -top-3 w-4 h-6 rounded-sm"
                    style={{ backgroundColor: '#ef4444' }}
                  ></div>
                </div>
              </div>
              <div className="flex-1">
                <p 
                  className="text-xs uppercase mb-1"
                  style={{ color: secondaryColor }}
                >
                  Mail me at:
                </p>
                <a 
                  href={`mailto:${contactMethods.find(m => m.type === 'email')?.value || 'hello@example.com'}`}
                  className="text-lg font-semibold hover:opacity-80 transition-opacity break-all"
                  style={{ color: textColor }}
                >
                  {contactMethods.find(m => m.type === 'email')?.value || 'hello@example.com'}
                </a>
              </div>
            </div>
          </div>

          {/* Social Card */}
          <div 
            className="rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            style={{ backgroundColor: cardBackgroundColor }}
          >
            <div className="flex items-start gap-4">
              <div 
                className="w-20 h-20 rounded-xl flex items-center justify-center text-4xl flex-shrink-0"
                style={{ backgroundColor: `${primaryColor}20` }}
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full rounded-xl object-cover"
                  />
                ) : (
                  <span>👋</span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p 
                      className="text-xs uppercase mb-1"
                      style={{ color: secondaryColor }}
                    >
                      Download
                    </p>
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-semibold hover:opacity-80 transition-opacity"
                      style={{ color: textColor }}
                    >
                      Resume
                    </a>
                  </div>
                  <div 
                    className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: textColor }}
                  >
                    {showQRCode && qrCodeUrl ? (
                      <img 
                        src={qrCodeUrl} 
                        alt="QR Code" 
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <div className="grid grid-cols-3 gap-1">
                        {[...Array(9)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-2 h-2 rounded-sm ${
                              [0, 1, 2, 3, 5, 6, 7, 8].includes(i) ? 'bg-white' : ''
                            }`}
                            style={{ 
                              backgroundColor: [0, 1, 2, 3, 5, 6, 7, 8].includes(i) 
                                ? cardBackgroundColor 
                                : `${textColor}80`
                            }}
                          ></div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <p 
                  className="text-xs uppercase mb-3"
                  style={{ color: secondaryColor }}
                >
                  Add me to your contacts list
                </p>
                <div className="flex gap-3">
                  {socialLinks && socialLinks.length > 0 && socialLinks.slice(0, 3).map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg border-2 flex items-center justify-center hover:opacity-80 transition-opacity"
                      style={{ 
                        borderColor: `${secondaryColor}40`,
                        backgroundColor: `${secondaryColor}10`
                      }}
                      title={social.platform}
                    >
                      {getSocialIcon(social.platform)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p 
              className="text-sm"
              style={{ color: `${secondaryColor}80` }}
            >
              HAVE A BEAUTIFUL DAY!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MinimalContact;