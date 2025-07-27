import React, { useMemo } from "react";

interface PreviewComponentProps {
  colors: { background: string; text: string; primary: string };
}

const PreviewComponent: React.FC<PreviewComponentProps> = React.memo(
  function PreviewComponent({ colors }) {
    const style = useMemo(
      () => ({
        backgroundColor: colors.background,
        color: colors.text,
        transition: "background-color 0.2s ease, color 0.2s ease",
        borderRadius: "1rem",
        padding: "2rem",
        minHeight: "200px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      }),
      [colors.background, colors.text]
    );

    return (
      <div style={style}>
        <h1 style={{ color: colors.primary, transition: "color 0.2s ease" }}>
          Live Preview
        </h1>
        <p>This area updates instantly as you pick colors.</p>
      </div>
    );
  }
);

PreviewComponent.displayName = "PreviewComponent";

export default PreviewComponent;
