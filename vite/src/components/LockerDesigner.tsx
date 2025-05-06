import React, { useEffect, useState } from "react";
import { COLOR_OPTIONS, CONFIG } from "../config/config";
import "../styles/LockerDesigner.css";

import type { LockerState } from "../types/types";
import { getParamsFromUrl, updateUrlWithState } from "../utils/urlUtils";
import ColorPicker from "./controls/ColorPicker";
import RangeControl from "./controls/RangeControl";
import SelectControl from "./controls/SelectControl";
import DetailsPanel from "./DetailsPanel";
import LockerVisualization from "./LockerVisualization";
import ShareButton from "./ShareButton";

const LockerDesigner: React.FC = () => {
  // Initialize state with defaults
  const [lockerState, setLockerState] = useState<LockerState>({
    height: CONFIG.HEIGHT.default,
    width: CONFIG.WIDTH.default,
    depth: CONFIG.DEPTH.default,
    legsLength: CONFIG.LEGS_LENGTH.default,
    legsWidth: CONFIG.LEGS_WIDTH.default,
    columns: CONFIG.COLUMNS.default,
    cleaningColumnPos: CONFIG.CLEANING_COLUMN_POS[2], // right is default
    shelves: CONFIG.SHELVES.default,
    color: COLOR_OPTIONS[0].color,
    colorName: COLOR_OPTIONS[0].name,
    doorType: CONFIG.DOOR_TYPES[0],
    handleStyle: CONFIG.HANDLE_STYLES[0],
    includeCleaningColumn: true,
  });

  // Load from URL params on initial load
  useEffect(() => {
    const urlParams = getParamsFromUrl();
    if (Object.keys(urlParams).length > 0) {
      setLockerState((prev) => ({ ...prev, ...urlParams }));
    }
  }, []);

  // Update URL when state changes (debounced to avoid excessive updates)
  useEffect(() => {
    const handler = setTimeout(() => {
      updateUrlWithState(lockerState);
    }, 500);
    return () => clearTimeout(handler);
  }, [lockerState]);

  // State update handlers
  const handleValueChange = (
    key: keyof LockerState,
    value: number | string | boolean
  ) => {
    setLockerState((prev) => ({ ...prev, [key]: value }));
  };

  const handleColorChange = (color: string, name: string) => {
    setLockerState((prev) => ({ ...prev, color, colorName: name }));
  };

  const handleIncludeCleaningColumnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLockerState((prev) => ({
      ...prev,
      includeCleaningColumn: e.target.checked,
    }));
  };

  return (
    <div className="container">
      <h1>Custom Kitchen Locker Designer</h1>
      <p>
        Adjust the parameters below to customize your kitchen locker. The
        visualization will update in real-time.
      </p>

      <div className="controls-container">
        <div className="control-group">
          <h3>Size</h3>
          <RangeControl
            id="height"
            label="Height (cm)"
            config={CONFIG.HEIGHT}
            value={lockerState.height}
            unit="cm"
            onChange={(value) => handleValueChange("height", value)}
          />
          <RangeControl
            id="width"
            label="Width (cm)"
            config={CONFIG.WIDTH}
            value={lockerState.width}
            unit="cm"
            onChange={(value) => handleValueChange("width", value)}
          />
          <RangeControl
            id="depth"
            label="Depth (cm)"
            config={CONFIG.DEPTH}
            value={lockerState.depth}
            unit="cm"
            onChange={(value) => handleValueChange("depth", value)}
          />
          <RangeControl
            id="legs-length"
            label="Legs Length (cm)"
            config={CONFIG.LEGS_LENGTH}
            value={lockerState.legsLength}
            unit="cm"
            onChange={(value) => handleValueChange("legsLength", value)}
          />
          <SelectControl
            id="legs-width"
            label="Leg Width (cm)"
            options={CONFIG.LEGS_WIDTH.options}
            value={lockerState.legsWidth}
            onChange={(value) =>
              handleValueChange("legsWidth", parseInt(value, 10))
            }
            formatOption={(option) => `${option} cm`}
          />
        </div>

        <div className="control-group">
          <h3>Configuration</h3>
          <RangeControl
            id="columns"
            label="Number of Columns"
            config={CONFIG.COLUMNS}
            value={lockerState.columns}
            unit="columns"
            onChange={(value) => handleValueChange("columns", value)}
          />
          <div
            style={{
              display: lockerState.includeCleaningColumn ? "block" : "none",
            }}
          >
            <SelectControl
              id="cleaning-column-position"
              label="Cleaning Column Position"
              options={CONFIG.CLEANING_COLUMN_POS}
              value={lockerState.cleaningColumnPos}
              onChange={(value) =>
                handleValueChange("cleaningColumnPos", value)
              }
              formatOption={(option) =>
                option.toString().charAt(0).toUpperCase() +
                option.toString().slice(1)
              }
            />
          </div>
          <RangeControl
            id="shelves-per-column"
            label="Shelves in Regular Columns"
            config={CONFIG.SHELVES}
            value={lockerState.shelves}
            unit="shelves"
            onChange={(value) => handleValueChange("shelves", value)}
          />
          <div className="control-item">
            <label>
              <input
                type="checkbox"
                checked={lockerState.includeCleaningColumn}
                onChange={handleIncludeCleaningColumnChange}
              />
              Include cleaning column?
            </label>
          </div>
        </div>

        <div className="control-group">
          <h3>Appearance</h3>
          <ColorPicker
            colors={COLOR_OPTIONS}
            selectedColor={lockerState.color}
            onSelectColor={handleColorChange}
          />
          <SelectControl
            id="door-type"
            label="Door Type"
            options={CONFIG.DOOR_TYPES}
            value={lockerState.doorType}
            onChange={(value) => handleValueChange("doorType", value)}
            formatOption={(option) =>
              option.toString().charAt(0).toUpperCase() +
              option.toString().slice(1)
            }
          />
          <SelectControl
            id="handle-style"
            label="Handle Style"
            options={CONFIG.HANDLE_STYLES}
            value={lockerState.handleStyle}
            onChange={(value) => handleValueChange("handleStyle", value)}
            formatOption={(option) =>
              option.toString().charAt(0).toUpperCase() +
              option.toString().slice(1)
            }
          />
        </div>
      </div>

      <LockerVisualization lockerState={lockerState} />
      <div className="floor"></div>

      <DetailsPanel lockerState={lockerState} />
      <ShareButton lockerState={lockerState} />
    </div>
  );
};

export default LockerDesigner;
