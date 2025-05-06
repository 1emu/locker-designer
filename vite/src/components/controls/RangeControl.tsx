import React from "react";
import type { Range } from "../../types/types";

interface RangeControlProps {
  id: string;
  label: string;
  config: Range;
  value: number;
  unit?: string;
  onChange: (value: number) => void;
}

const RangeControl: React.FC<RangeControlProps> = ({
  id,
  label,
  config,
  value,
  unit = "",
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseInt(e.target.value, 10));
  };

  return (
    <div className="control-item">
      <label htmlFor={id}>{label}</label>
      <input
        type="range"
        id={id}
        min={config.min}
        max={config.max}
        value={value}
        step="1"
        onChange={handleChange}
      />
      <div className="value-display">
        <span>{value}</span> {unit}
      </div>
    </div>
  );
};

export default RangeControl;
