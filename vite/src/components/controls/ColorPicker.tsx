import React from "react";
import type { ColorOption } from "../../types/types";

interface ColorPickerProps {
  colors: ColorOption[];
  selectedColor: string;
  onSelectColor: (color: string, name: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  colors,
  selectedColor,
  onSelectColor,
}) => {
  return (
    <div className="control-item">
      <label>Locker Color</label>
      <div className="color-options">
        {colors.map((colorOption) => (
          <div
            key={colorOption.color}
            className={`color-option ${
              colorOption.color === selectedColor ? "selected" : ""
            }`}
            style={{ backgroundColor: colorOption.color }}
            onClick={() => onSelectColor(colorOption.color, colorOption.name)}
            title={colorOption.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
