import React from "react";

interface SelectControlProps {
  id: string;
  label: string;
  options: string[] | number[];
  value: string | number;
  onChange: (value: string) => void;
  formatOption?: (option: string | number) => string;
}

const SelectControl: React.FC<SelectControlProps> = ({
  id,
  label,
  options,
  value,
  onChange,
  formatOption = (option) => `${option}`,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="control-item">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={handleChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {formatOption(option)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectControl;
