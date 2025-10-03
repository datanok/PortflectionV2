import React, { useState, useCallback } from "react";
import ColorPanel from "./ColorPanel";
import PreviewComponent from "./PreviewComponent";

const defaultColors = {
  background: "#ffffff",
  text: "#111827",
  primary: "#3b82f6",
};

const LOCAL_STORAGE_KEY = "portfolioColors";

const ParentComponent: React.FC = () => {
  const [colors, setColorsState] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultColors;
  });
  const [saveMode, setSaveMode] = useState(false);

  // requestAnimationFrame wrapper for color updates
  const setColors = useCallback((updater) => {
    requestAnimationFrame(() => {
      setColorsState(updater);
    });
  }, []);

  const handleSave = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(colors));
    // Optionally show a toast or feedback
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start p-8">
      <div>
        <div className="mb-4 flex items-center gap-4">
          <label className="font-semibold">Mode:</label>
          <button
            className="px-3 py-1 rounded transition-colors"
            style={{
              backgroundColor: !saveMode ? colors.primary : "#e5e7eb",
              color: !saveMode ? colors.background : colors.text,
            }}
            onClick={() => setSaveMode(false)}
          >
            Live Preview
          </button>
          <button
            className="px-3 py-1 rounded transition-colors"
            style={{
              backgroundColor: saveMode ? colors.primary : "#e5e7eb",
              color: saveMode ? colors.background : colors.text,
            }}
            onClick={() => setSaveMode(true)}
          >
            Save Mode
          </button>
        </div>
        <ColorPanel
          colors={colors}
          setColors={setColors}
          onSave={handleSave}
          saveMode={saveMode}
        />
      </div>
      <div className="flex-1">
        <PreviewComponent colors={colors} />
      </div>
    </div>
  );
};

export default ParentComponent;
