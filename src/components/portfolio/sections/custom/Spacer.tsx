import React from "react";

interface SpacerProps {
  height?: number;
  backgroundColor?: string;
  showBorder?: boolean;
  borderColor?: string;
  borderStyle?: "solid" | "dashed" | "dotted";
}

const Spacer: React.FC<SpacerProps> = ({
  height = 60,
  backgroundColor = "transparent",
  showBorder = false,
  borderColor = "#e5e7eb",
  borderStyle = "solid",
}) => {
  const borderStyles = {
    solid: "border-solid",
    dashed: "border-dashed",
    dotted: "border-dotted",
  };

  return (
    <div
      className={`w-full ${
        showBorder ? `border-t ${borderStyles[borderStyle]}` : ""
      }`}
      style={{
        height: `${height}px`,
        backgroundColor: backgroundColor,
        borderColor: showBorder ? borderColor : "transparent",
      }}
    />
  );
};

export default Spacer;
