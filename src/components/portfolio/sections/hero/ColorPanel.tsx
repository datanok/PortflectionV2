import React from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPanelProps {
  colors: { background: string; text: string; primary: string };
  setColors: (updater: (c: any) => any) => void;
  onSave?: () => void;
  saveMode?: boolean;
}

const ColorPanel: React.FC<ColorPanelProps> = ({
  colors,
  setColors,
  onSave,
  saveMode,
}) => {
  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow-md w-72">
      <div>
        <label className="block font-medium mb-2">Background Color</label>
        <HexColorPicker
          color={colors.background}
          onChange={(color) =>
            setColors((c: any) => ({ ...c, background: color }))
          }
        />
        <div className="mt-2 text-xs">{colors.background}</div>
      </div>
      <div>
        <label className="block font-medium mb-2">Text Color</label>
        <HexColorPicker
          color={colors.text}
          onChange={(color) => setColors((c: any) => ({ ...c, text: color }))}
        />
        <div className="mt-2 text-xs">{colors.text}</div>
      </div>
      <div>
        <label className="block font-medium mb-2">Primary Color</label>
        <HexColorPicker
          color={colors.primary}
          onChange={(color) =>
            setColors((c: any) => ({ ...c, primary: color }))
          }
        />
        <div className="mt-2 text-xs">{colors.primary}</div>
      </div>
      {saveMode && (
        <button
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          onClick={onSave}
        >
          Save Changes
        </button>
      )}
    </div>
  );
};

export default ColorPanel;
