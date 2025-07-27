import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

interface ContactMethod {
  icon: string;
  label: string;
  value: string;
  link: string;
}

interface ContactTypographyProps {
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
  paddingY?: string;
  paddingX?: string;
  textAlign?: "left" | "center" | "right";
  fontSize?: string;
  fontWeight?: string;
  borderRadius?: string;
  shadow?: string;

  // Global Theme
  globalTheme?: any;
}

const ContactTypography: React.FC<ContactTypographyProps> = ({
  title = "CONTACT",
  subtitle = "LET'S WORK TOGETHER",
  description = "I'm always interested in new opportunities and exciting projects. Whether you have a question or just want to say hi, feel free to reach out.",
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
  ],
  showContactForm = true,
  formTitle = "Send Message",
  formSubtitle = "Drop me a line",
  backgroundColor = "#ffffff",
  textColor = "#111827",
  primaryColor = "#000000",
  secondaryColor = "#6b7280",
  paddingY = "120",
  paddingX = "32",
  textAlign = "left",
  fontSize = "4xl",
  fontWeight = "black",
  borderRadius = "0",
  shadow = "none",
  globalTheme,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  const containerStyles = {
    backgroundColor,
    color: textColor,
    borderRadius: borderRadius !== "0" ? `${borderRadius}px` : "0px",
    boxShadow: shadow !== "none" ? shadow : "none",
  };

  const titleStyles = {
    color: primaryColor,
    fontSize: fontSize === "4xl" ? "clamp(3rem, 8vw, 8rem)" : fontSize,
    fontWeight: fontWeight === "black" ? "900" : fontWeight,
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
    lineHeight: "0.85",
    letterSpacing: "-0.02em",
  };

  const subtitleStyles = {
    color: secondaryColor,
    fontSize: "1.5rem",
    fontWeight: "400",
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
  };

  const getIcon = (iconName: string) => {
    const iconMap: {
      [key: string]: React.ComponentType<{
        size: number;
        style?: any;
        className?: string;
      }>;
    } = {
      mail: Mail,
      phone: Phone,
      mappin: MapPin,
      send: Send,
      check: CheckCircle,
    };
    return iconMap[iconName] || Mail;
  };

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

    // Simulate form submission
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
      className={`py-${paddingY} px-${paddingX} relative`}
      style={containerStyles}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`mb-16 text-${textAlign}`}>
          <h2 className="mb-4 tracking-tighter" style={titleStyles}>
            {title}
          </h2>
          <p className="mb-8" style={subtitleStyles}>
            {subtitle}
          </p>
          {description && (
            <p
              className="max-w-3xl text-lg leading-relaxed"
              style={{ color: textColor }}
            >
              {description}
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-5 space-y-12">
            {/* Contact Methods */}
            <div className="space-y-8">
              <div
                className="text-xl font-bold uppercase tracking-wider"
                style={{
                  color: primaryColor,
                  fontFamily:
                    "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                }}
              >
                Get In Touch
              </div>

              {contactMethods.map((method, index) => {
                const IconComponent = getIcon(method.icon);

                return (
                  <a
                    key={index}
                    href={method.link}
                    className="group block border border-gray-200 p-6 hover:border-black transition-all duration-300 hover:translate-x-2"
                    style={{ borderColor: `${secondaryColor}20` }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="flex-shrink-0 w-12 h-12 border border-gray-300 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300"
                        style={{ borderColor: `${secondaryColor}40` }}
                      >
                        <IconComponent size={20} />
                      </div>

                      <div className="flex-1">
                        <div
                          className="text-sm uppercase tracking-wider mb-1 font-medium"
                          style={{
                            color: secondaryColor,
                            fontFamily:
                              "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                          }}
                        >
                          {method.label}
                        </div>
                        <div
                          className="text-lg font-medium"
                          style={{ color: textColor }}
                        >
                          {method.value}
                        </div>
                      </div>
                    </div>
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
                    className="text-2xl font-bold uppercase tracking-wider mb-2"
                    style={{
                      color: primaryColor,
                      fontFamily:
                        "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                    }}
                  >
                    {formTitle}
                  </div>
                  <div className="text-lg" style={{ color: secondaryColor }}>
                    {formSubtitle}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block text-sm uppercase tracking-wider mb-2 font-medium"
                        style={{
                          color: secondaryColor,
                          fontFamily:
                            "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
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
                        className="w-full px-4 py-3 border border-gray-300 focus:border-black outline-none transition-all duration-300"
                        style={{
                          borderColor: `${secondaryColor}40`,
                          fontFamily:
                            "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                        }}
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm uppercase tracking-wider mb-2 font-medium"
                        style={{
                          color: secondaryColor,
                          fontFamily:
                            "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
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
                        className="w-full px-4 py-3 border border-gray-300 focus:border-black outline-none transition-all duration-300"
                        style={{
                          borderColor: `${secondaryColor}40`,
                          fontFamily:
                            "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm uppercase tracking-wider mb-2 font-medium"
                      style={{
                        color: secondaryColor,
                        fontFamily:
                          "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
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
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black outline-none transition-all duration-300"
                      style={{
                        borderColor: `${secondaryColor}40`,
                        fontFamily:
                          "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm uppercase tracking-wider mb-2 font-medium"
                      style={{
                        color: secondaryColor,
                        fontFamily:
                          "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                      }}
                    >
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black outline-none transition-all duration-300 resize-vertical"
                      style={{
                        borderColor: `${secondaryColor}40`,
                        fontFamily:
                          "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                      }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={formStatus === "sending"}
                    className="group flex items-center gap-3 px-8 py-4 border-2 border-black bg-black text-white hover:bg-transparent hover:text-black transition-all duration-300 uppercase tracking-wider font-medium disabled:opacity-50"
                    style={{
                      borderColor: primaryColor,
                      backgroundColor:
                        formStatus === "sent" ? "#10b981" : primaryColor,
                      color:
                        formStatus === "sent"
                          ? "#ffffff"
                          : formStatus === "sending"
                          ? "#ffffff"
                          : backgroundColor,
                      fontFamily:
                        "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
                    }}
                  >
                    {formStatus === "sending" && (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                    {formStatus === "sent" && <CheckCircle size={18} />}
                    {formStatus === "idle" && (
                      <Send
                        size={18}
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
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle size={16} />
                      <span className="text-sm">
                        Thank you! I&apos;ll get back to you soon.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom accent */}
        <div className="mt-24 flex justify-center">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-px"
              style={{ backgroundColor: primaryColor }}
            />
            <span
              className="text-sm uppercase tracking-widest"
              style={{
                color: secondaryColor,
                fontFamily:
                  "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
              }}
            >
              Let&apos;s Connect
            </span>
            <div
              className="w-12 h-px"
              style={{ backgroundColor: primaryColor }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactTypography;
