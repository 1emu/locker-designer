import React from "react";
import type { LockerState } from "../types/types";

interface DetailsPanelProps {
  lockerState: LockerState;
}

const DetailsPanel: React.FC<DetailsPanelProps> = ({ lockerState }) => {
  const {
    height,
    width,
    depth,
    columns,
    shelves,
    cleaningColumnPos,
    cleaningColumnWidth,
    legsLength,
    color,
    colorName,
    includeCleaningColumn,
  } = lockerState;

  // Calculate shelf height
  const shelfHeight = ((height - legsLength) / shelves).toFixed(1);

  // Calculate regular column width
  const regularColumnWidth = includeCleaningColumn
    ? ((width - cleaningColumnWidth) / (columns - 1)).toFixed(1)
    : (width / columns).toFixed(1);

  return (
    <div className="details-panel">
      <div className="details-title">Locker Specifications</div>
      <div className="detail-item">
        <span className="label">External Dimensions:</span>
        <span>
          {width} × {depth} × {height} cm (Width × Depth × Height)
        </span>
      </div>
      <div className="detail-item">
        <span className="label">Configuration:</span>
        <span>
          {columns} columns
          {includeCleaningColumn &&
            ` with 1 cleaning column (${cleaningColumnPos} position, ${cleaningColumnWidth} cm width)`}
        </span>
      </div>
      {includeCleaningColumn && (
        <div className="detail-item">
          <span className="label">Column Widths:</span>
          <span>
            Regular columns: {regularColumnWidth} cm each
            <br />
            Cleaning column: {cleaningColumnWidth} cm
          </span>
        </div>
      )}
      <div className="detail-item">
        <span className="label">Storage Capacity:</span>
        <span>
          {shelves * (includeCleaningColumn ? columns - 1 : columns)} regular
          shelves
          {includeCleaningColumn && " + 1 cleaning supplies area"}
        </span>
      </div>
      <div className="detail-item">
        <span className="label">Material:</span> Steel with powder coat finish
      </div>
      <div className="detail-item">
        <span className="label">Color:</span>
        <span>
          {colorName} ({color})
        </span>
      </div>
      <div className="detail-item">
        <span className="label">Shelf Height (regular columns):</span>
        <span>{shelfHeight} cm</span>
      </div>
      <div className="detail-item">
        <span className="label">Special Features:</span> Lockable doors,
        ventilation at base
      </div>
    </div>
  );
};

export default DetailsPanel;
