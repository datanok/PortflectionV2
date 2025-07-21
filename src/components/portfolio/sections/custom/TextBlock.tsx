import React from "react";

interface TextBlockProps {
  content?: string;
  alignment?: "left" | "center" | "right";
  fontSize?: "sm" | "base" | "lg" | "xl" | "2xl";
  fontWeight?: "normal" | "medium" | "semibold" | "bold";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "none";
  padding?: "sm" | "md" | "lg" | "xl";
}

const TextBlock: React.FC<TextBlockProps> = ({
  content = "Add your custom text content here. This block supports rich formatting.",
  alignment = "left",
  fontSize = "base",
  fontWeight = "normal",
  maxWidth = "lg",
  padding = "md",
}) => {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const fontSizeClasses = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
  };

  const fontWeightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    none: "max-w-none",
  };

  const paddingClasses = {
    sm: "py-4",
    md: "py-8",
    lg: "py-12",
    xl: "py-16",
  };

  return (
    <section className={`${paddingClasses[padding]}`}>
      <div className="container mx-auto px-4">
        <div className={`mx-auto ${maxWidthClasses[maxWidth]}`}>
          <div
            className={`${alignmentClasses[alignment]} ${fontSizeClasses[fontSize]} ${fontWeightClasses[fontWeight]} leading-relaxed`}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </section>
  );
};

export default TextBlock;
