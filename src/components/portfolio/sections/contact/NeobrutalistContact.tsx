import React, { useState, useMemo } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Linkedin,
  Github,
  Twitter,
  Instagram,
} from "lucide-react";
import { PortfolioFontLoader } from "@/lib/portfolioFontLoader";
import { getFontWithDefault } from "@/lib/componentDefaultFonts";

interface ContactMethod {
  icon: string;
  label: string;
  value: string;
  link: string;
}

interface NeobrutalistContactProps {
  // Content Props
  title?: string;
  subtitle?: string;
  description?: string;
  contactMethods?: ContactMethod[];
  showContactForm?: boolean;
  formTitle?: string;
  formSubtitle?: string;

  // Style Props
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  shadowColor?: string;
  cardBackgroundColor?: string;
  successColor?: string;
  borderColor?: string;
  paddingY?: string;
  paddingX?: string;
  textAlign?: "left" | "center" | "right";
  fontSize?: string;
  fontWeight?: string;
  borderRadius?: string;
  shadowOffset?: string;
  borderWidth?: string;

  // Global Theme
  globalTheme?: any;
}

const NeobrutalistContact: React.FC<NeobrutalistContactProps> = ({
  title = "GET IN TOUCH",
  subtitle = "LET'S CREATE SOMETHING AMAZING",
  description = "Ready to bring your wildest ideas to life? Drop me a line and let's make some digital magic happen. No boring projects, please!",
  contactMethods = [
    {
      icon: "mail",
      label: "Email",
      value: "hello@johndoe.dev",
      link: "mailto:hello@johndoe.dev",
    },
    {
      icon: "phone",
      label: "Phone",
      value: "+91 98765 43210",
      link: "tel:+919876543210",
    },
    {
      icon: "mappin",
      label: "Location",
      value: "Mumbai, India",
      link: "https://maps.google.com/?q=Mumbai,India",
    },
    {
      icon: "linkedin",
      label: "LinkedIn",
      value: "linkedin.com/in/johndoe",
      link: "https://linkedin.com/in/johndoe",
    },
  ],
  showContactForm = true,
  formTitle = "DROP A LINE",
  formSubtitle = "Let's chat!",
  backgroundColor = "#fbbf24",
  textColor = "#000000",
  primaryColor = "#000000",
  secondaryColor = "#1f2937",
  accentColor = "#ef4444",
  shadowColor = "#000000",
  cardBackgroundColor = "#ffffff",
  successColor = "#10b981",
  borderColor = "#000000",
  paddingY = "12",
  paddingX = "32",
  textAlign = "left",
  fontSize = "4xl",
  fontWeight = "black",
  borderRadius = "0",
  shadowOffset = "8",
  borderWidth = "4",
  globalTheme,
}) => {
  // Get font families from global theme with neobrutalist defaults
  const bodyFont = useMemo(() => {
    const fontName = getFontWithDefault(globalTheme, "body", "neobrutalist");
    return PortfolioFontLoader.getFontFamily(fontName);
  }, [globalTheme]);

  const headingFont = useMemo(() => {
    const fontName = getFontWithDefault(globalTheme, "heading", "neobrutalist");
    return PortfolioFontLoader.getFontFamily(fontName);
  }, [globalTheme]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  const getFontSize = (size: string) => {
    const sizeMap: { [key: string]: string } = {
      xs: "clamp(0.75rem, 2vw, 1rem)",
      sm: "clamp(0.875rem, 2vw, 1.125rem)",
      base: "clamp(1rem, 2.5vw, 1.25rem)",
      lg: "clamp(1.125rem, 3vw, 1.5rem)",
      xl: "clamp(1.25rem, 3.5vw, 1.75rem)",
      "2xl": "clamp(1.5rem, 4vw, 2rem)",
      "3xl": "clamp(1.875rem, 5vw, 2.5rem)",
      "4xl": "clamp(2.25rem, 6vw, 3rem)",
      "5xl": "clamp(3rem, 8vw, 4rem)",
      "6xl": "clamp(3.75rem, 10vw, 5rem)",
    };
    return sizeMap[size] || size;
  };

  const getIcon = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      mail: Mail,
      phone: Phone,
      mappin: MapPin,
      send: Send,
      check: CheckCircle,
      linkedin: Linkedin,
      github: Github,
      twitter: Twitter,
      instagram: Instagram,
    };
    return iconMap[iconName] || Mail;
  };

  const containerStyles: React.CSSProperties = {
    backgroundColor,
    color: textColor,
    borderRadius: borderRadius !== "0" ? `${borderRadius}px` : "0px",
  };

  const titleStyles: React.CSSProperties = {
    color: primaryColor,
    fontSize: getFontSize(fontSize),
    fontWeight: fontWeight === "black" ? "900" : fontWeight,
    fontFamily: headingFont,
    lineHeight: "0.9",
    letterSpacing: "-0.025em",
    textTransform: "uppercase",
  };

  const subtitleStyles: React.CSSProperties = {
    color: secondaryColor,
    fontSize: getFontSize("xl"),
    fontWeight: "700",
    fontFamily: headingFont,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  };

  const neoBrutalShadow = `${shadowOffset}px ${shadowOffset}px 0px ${shadowColor}`;
  const neoBrutalHoverShadow = `${parseInt(shadowOffset) + 2}px ${
    parseInt(shadowOffset) + 2
  }px 0px ${shadowColor}`;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    setFormStatus("sending");
    setTimeout(() => {
      setFormStatus("sent");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    }, 2000);
  };

  return (
    <section
      className={`py-${paddingY} px-4 sm:px-${paddingX} relative overflow-hidden`}
      style={{ ...containerStyles, fontFamily: bodyFont }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`mb-16 text-${textAlign}`}>
          <h2 className="mb-6" style={titleStyles}>
            {title}
          </h2>
          <p className="mb-8" style={subtitleStyles}>
            {subtitle}
          </p>
          {description && (
            <p
              className="max-w-2xl text-lg font-medium leading-relaxed"
              style={{
                color: secondaryColor,
                fontFamily: bodyFont,
              }}
            >
              {description}
            </p>
          )}
        </div>

        <div
          className={`grid gap-8 lg:gap-16 ${
            showContactForm ? "lg:grid-cols-12" : "lg:grid-cols-1"
          }`}
        >
          {/* Left Column - Contact Info */}
          <div
            className={`${
              showContactForm ? "lg:col-span-5" : "lg:col-span-12"
            }`}
          >
            <div
              className={`grid gap-4 ${
                showContactForm
                  ? "sm:grid-cols-1 md:grid-cols-2"
                  : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
              }`}
            >
              {contactMethods.map((method, index) => {
                const IconComponent = getIcon(method.icon);

                return (
                  <a
                    key={index}
                    href={method.link}
                    target="_blank"
                    className="group relative block p-5 border transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      backgroundColor: backgroundColor,
                      borderColor: primaryColor,
                      borderWidth: `${borderWidth}px`,
                      borderRadius: `${borderRadius}px`,
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="inline-flex items-center justify-center w-12 h-12 border mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: accentColor,
                        borderColor: primaryColor,
                        borderWidth: `${borderWidth}px`,
                        borderRadius: `${borderRadius}px`,
                        color: primaryColor,
                      }}
                    >
                      <IconComponent size={20} />
                    </div>

                    {/* Content */}
                    <div className="space-y-1">
                      <div
                        className="text-xs uppercase tracking-widest font-semibold"
                        style={{
                          color: secondaryColor,
                          fontFamily: headingFont,
                        }}
                      >
                        {method.label}
                      </div>
                      <div
                        className="text-base font-bold leading-tight break-words"
                        style={{
                          color: primaryColor,
                          fontFamily: headingFont,
                        }}
                      >
                        {method.value}
                      </div>
                    </div>

                    {/* Hover indicator */}
                    <div
                      className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-300"
                      style={{
                        backgroundColor: primaryColor,
                      }}
                    />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column - Contact Form */}
          {showContactForm && (
            <div className="lg:col-span-7">
              <div className="space-y-8">
                <div>
                  <div
                    className="inline-block px-6 py-3 border mb-4 transform -rotate-1 hover:rotate-0 transition-all duration-300"
                    style={{
                      backgroundColor: backgroundColor,
                      color: primaryColor,
                      borderColor: primaryColor,
                      borderWidth: `${borderWidth}px`,
                      boxShadow: neoBrutalShadow,
                      fontFamily: headingFont,
                      fontWeight: fontWeight,
                      fontSize: getFontSize("lg"),
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {formTitle}
                  </div>
                  <p
                    className="text-base font-medium"
                    style={{
                      color: secondaryColor,
                      fontFamily: headingFont,
                    }}
                  >
                    {formSubtitle}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block text-sm uppercase tracking-wider mb-3 font-bold"
                        style={{
                          color: primaryColor,
                          fontFamily: headingFont,
                        }}
                      >
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-2 py-2 border outline-none transition-all duration-300 font-medium"
                        style={{
                          borderColor: primaryColor,
                          borderWidth: `${borderWidth}px`,
                          boxShadow: `4px 4px 0px ${shadowColor}`,
                          fontFamily: headingFont,
                          backgroundColor: backgroundColor,
                        }}
                        onFocus={(e) => {
                          e.target.style.boxShadow = `6px 6px 0px ${shadowColor}`;
                          e.target.style.transform = "translate(-1px, -1px)";
                        }}
                        onBlur={(e) => {
                          e.target.style.boxShadow = `4px 4px 0px ${shadowColor}`;
                          e.target.style.transform = "translate(0, 0)";
                        }}
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm uppercase tracking-wider mb-3 font-bold"
                        style={{
                          color: primaryColor,
                          fontFamily: headingFont,
                        }}
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border outline-none transition-all duration-300 font-medium"
                        style={{
                          borderColor: primaryColor,
                          borderWidth: `${borderWidth}px`,
                          boxShadow: `4px 4px 0px ${shadowColor}`,
                          fontFamily: headingFont,
                          backgroundColor: backgroundColor,
                        }}
                        onFocus={(e) => {
                          e.target.style.boxShadow = `6px 6px 0px ${shadowColor}`;
                          e.target.style.transform = "translate(-1px, -1px)";
                        }}
                        onBlur={(e) => {
                          e.target.style.boxShadow = `4px 4px 0px ${shadowColor}`;
                          e.target.style.transform = "translate(0, 0)";
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm uppercase tracking-wider mb-3 font-bold"
                      style={{
                        color: primaryColor,
                        fontFamily: headingFont,
                      }}
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border outline-none transition-all duration-300 font-medium"
                      style={{
                        borderColor: primaryColor,
                        borderWidth: `${borderWidth}px`,
                        boxShadow: `4px 4px 0px ${shadowColor}`,
                        fontFamily: headingFont,
                        backgroundColor: backgroundColor,
                      }}
                      onFocus={(e) => {
                        e.target.style.boxShadow = `6px 6px 0px ${shadowColor}`;
                        e.target.style.transform = "translate(-1px, -1px)";
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = `4px 4px 0px ${shadowColor}`;
                        e.target.style.transform = "translate(0, 0)";
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm uppercase tracking-wider mb-3 font-bold"
                      style={{
                        color: primaryColor,
                        fontFamily: headingFont,
                      }}
                    >
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-2 py-2 border outline-none transition-all duration-300 resize-vertical font-medium"
                      style={{
                        borderColor: primaryColor,
                        borderWidth: `${borderWidth}px`,
                        boxShadow: `4px 4px 0px ${shadowColor}`,
                        fontFamily: headingFont,
                        backgroundColor: backgroundColor,
                      }}
                      onFocus={(e) => {
                        e.target.style.boxShadow = `6px 6px 0px ${shadowColor}`;
                        e.target.style.transform = "translate(-1px, -1px)";
                      }}
                      onBlur={(e) => {
                        e.target.style.boxShadow = `4px 4px 0px ${shadowColor}`;
                        e.target.style.transform = "translate(0, 0)";
                      }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={formStatus === "sending"}
                    className="group flex items-center gap-3 px-8 py-4 border  uppercase tracking-wider transition-all duration-300 disabled:opacity-50 hover:-translate-y-1 hover:translate-x-1"
                    style={{
                      borderColor: primaryColor,
                      backgroundColor:
                        formStatus === "sent" ? successColor : accentColor,
                      color: primaryColor,
                      borderWidth: `${borderWidth}px`,
                      boxShadow: neoBrutalShadow,
                      fontFamily: headingFont,
                      fontSize: "1.125rem",
                    }}
                    onMouseEnter={(e) => {
                      if (formStatus !== "sending") {
                        e.currentTarget.style.boxShadow = neoBrutalHoverShadow;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (formStatus !== "sending") {
                        e.currentTarget.style.boxShadow = neoBrutalShadow;
                      }
                    }}
                  >
                    {formStatus === "sending" && (
                      <div
                        className="w-5 h-5 border-3 border-t-transparent rounded-full animate-spin"
                        style={{
                          borderColor: backgroundColor,
                          borderTopColor: "transparent",
                        }}
                      />
                    )}
                    {formStatus === "sent" && <CheckCircle size={20} />}
                    {formStatus === "idle" && (
                      <Send
                        size={20}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    )}

                    {formStatus === "sending"
                      ? "Sending..."
                      : formStatus === "sent"
                      ? "Message Sent!"
                      : "Send Message"}
                  </button>

                  {formStatus === "sent" && (
                    <div
                      className="flex items-center gap-3 p-4 border font-medium"
                      style={{
                        backgroundColor: backgroundColor,
                        borderColor: successColor,
                        borderWidth: `${borderWidth}px`,
                        boxShadow: `4px 4px 0px ${successColor}`,
                        color: successColor,
                        fontFamily: headingFont,
                      }}
                    >
                      <CheckCircle size={20} />
                      <span>
                        Awesome! I&apos;ll get back to you faster than you can
                        say &ldquo;neobrutalism&rdquo;!
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NeobrutalistContact;
