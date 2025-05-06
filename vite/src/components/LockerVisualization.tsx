import React from "react";
import type { LockerState } from "../types/types";

interface LockerVisualizationProps {
  lockerState: LockerState;
}

const LockerVisualization: React.FC<LockerVisualizationProps> = ({
  lockerState,
}) => {
  const {
    height,
    width,
    depth,
    columns,
    shelves,
    cleaningColumnPos,
    cleaningColumnWidth,
    legsLength,
    legsWidth,
    color,
    handleStyle,
    includeCleaningColumn,
  } = lockerState;

  // SVG dimensions and scaling
  const svgWidth = 500;
  const svgHeight = 400;
  const scale =
    Math.min(svgWidth / width, svgHeight / (height + legsLength)) * 0.8;

  // Calculate dimensions in SVG space
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;
  const scaledLegs = legsLength * scale;

  // Center the locker
  const offsetX = (svgWidth - scaledWidth) / 2;
  const offsetY = (svgHeight - (scaledHeight + scaledLegs)) / 2;

  // Determine which column is the cleaning column
  let cleaningColIdx = -1;
  if (includeCleaningColumn) {
    if (cleaningColumnPos === "left") cleaningColIdx = 0;
    else if (cleaningColumnPos === "middle")
      cleaningColIdx = Math.floor(columns / 2);
    else if (cleaningColumnPos === "right") cleaningColIdx = columns - 1;
  }

  // Calculate column widths based on cleaning column width
  const scaledCleaningColumnWidth = includeCleaningColumn
    ? cleaningColumnWidth * scale
    : 0;
  const remainingWidth =
    scaledWidth - (includeCleaningColumn ? scaledCleaningColumnWidth : 0);
  const regularColumnCount = includeCleaningColumn ? columns - 1 : columns;
  const regularColumnWidth =
    regularColumnCount > 0 ? remainingWidth / regularColumnCount : 0;

  // Calculate the actual width for each column
  const columnWidths: number[] = [];
  for (let i = 0; i < columns; i++) {
    columnWidths.push(
      i === cleaningColIdx && includeCleaningColumn
        ? scaledCleaningColumnWidth
        : regularColumnWidth
    );
  }

  // Calculate the starting x position for each column
  const columnStartX: number[] = [];
  let currentX = offsetX;
  for (let i = 0; i < columns; i++) {
    columnStartX.push(currentX);
    currentX += columnWidths[i];
  }

  // Get regular column indices
  let regularColIndices: number[] = [];
  for (let i = 0; i < columns; i++) {
    if (i !== cleaningColIdx || !includeCleaningColumn) {
      regularColIndices.push(i);
    }
  }

  // Pair up regular columns
  let pairs: number[][] = [];
  for (let i = 0; i < regularColIndices.length; i += 2) {
    if (i + 1 < regularColIndices.length) {
      pairs.push([regularColIndices[i], regularColIndices[i + 1]]);
    } else {
      pairs.push([regularColIndices[i]]); // last unpaired
    }
  }

  // Generate SVG elements for columns and shelves
  const renderColumns = () => {
    const columnElements = [];

    for (let i = 0; i < columns; i++) {
      const columnX = columnStartX[i];
      const columnWidth = columnWidths[i];

      // Column divider (except for the last column)
      if (i < columns - 1) {
        columnElements.push(
          <line
            key={`divider-${i}`}
            x1={columnX + columnWidth}
            y1={offsetY}
            x2={columnX + columnWidth}
            y2={offsetY + scaledHeight}
            stroke="#000"
            strokeWidth="2"
          />
        );
      }

      // Determine if this is the cleaning column
      const isCleaningColumn = includeCleaningColumn && i === cleaningColIdx;

      // Door
      columnElements.push(
        <rect
          key={`door-${i}`}
          x={columnX + 2}
          y={offsetY + 2}
          width={columnWidth - 4}
          height={scaledHeight - 4}
          fill={color}
          stroke="#000"
          strokeWidth="1"
        />
      );

      // Door handle logic
      let handleX = null;
      if (isCleaningColumn) {
        // Cleaning column: handle on the right edge
        handleX = columnX + columnWidth - 10;
      } else {
        // Find which pair this column belongs to and if it's left or right in the pair
        let pairIdx = pairs.findIndex((pair) => pair.includes(i));
        if (pairIdx !== -1 && pairs[pairIdx].length === 2) {
          if (pairs[pairIdx][0] === i) {
            handleX = columnX + columnWidth - 10;
          } else {
            handleX = columnX + 10;
          }
        } else {
          handleX = columnX + columnWidth - 10;
        }
      }

      // Door handle
      if (handleStyle === "vertical") {
        columnElements.push(
          <line
            key={`handle-${i}`}
            x1={handleX}
            y1={offsetY + scaledHeight / 2 - 15}
            x2={handleX}
            y2={offsetY + scaledHeight / 2 + 15}
            stroke="#000"
            strokeWidth="3"
          />
        );
      } else if (handleStyle === "horizontal") {
        columnElements.push(
          <line
            key={`handle-${i}`}
            x1={handleX - 15}
            y1={offsetY + scaledHeight / 2}
            x2={handleX + 15}
            y2={offsetY + scaledHeight / 2}
            stroke="#000"
            strokeWidth="3"
          />
        );
      } else if (handleStyle === "recessed") {
        columnElements.push(
          <rect
            key={`handle-${i}`}
            x={handleX - 10}
            y={offsetY + scaledHeight / 2 - 5}
            width={20}
            height={10}
            fill="#555"
            rx={2}
          />
        );
      }

      // Lock (match handle logic)
      let lockX = null;
      if (isCleaningColumn) {
        lockX = columnX + columnWidth - 10;
      } else {
        let pairIdx = pairs.findIndex((pair) => pair.includes(i));
        if (pairIdx !== -1 && pairs[pairIdx].length === 2) {
          if (pairs[pairIdx][0] === i) {
            lockX = columnX + columnWidth - 10;
          } else {
            lockX = columnX + 10;
          }
        } else {
          lockX = columnX + columnWidth - 10;
        }
      }

      columnElements.push(
        <circle
          key={`lock-${i}`}
          cx={lockX}
          cy={offsetY + scaledHeight / 2 + 30}
          r={3}
          fill="#000"
        />
      );

      // Draw shelves or cleaning supplies
      if (isCleaningColumn) {
        // Top shelf for cleaning column
        const shelfY = offsetY + 30;
        columnElements.push(
          <line
            key={`shelf-cleaning-${i}`}
            x1={columnX + 2}
            y1={shelfY}
            x2={columnX + columnWidth - 2}
            y2={shelfY}
            stroke="#000"
            strokeWidth="1"
            strokeDasharray="2"
          />
        );

        // Broom symbol
        columnElements.push(
          <line
            key={`broom-stick-${i}`}
            x1={columnX + columnWidth / 2}
            y1={shelfY + 20}
            x2={columnX + columnWidth / 2}
            y2={offsetY + scaledHeight - 20}
            stroke="#555"
            strokeWidth="2"
          />
        );

        columnElements.push(
          <rect
            key={`broom-bottom-${i}`}
            x={columnX + columnWidth / 2 - 10}
            y={offsetY + scaledHeight - 30}
            width={20}
            height={10}
            fill="#8B4513"
          />
        );
      } else {
        // Regular shelves
        const shelfHeight = (scaledHeight - 6) / shelves;
        for (let j = 1; j < shelves; j++) {
          const shelfY = offsetY + j * shelfHeight;
          columnElements.push(
            <line
              key={`shelf-${i}-${j}`}
              x1={columnX + 2}
              y1={shelfY}
              x2={columnX + columnWidth - 2}
              y2={shelfY}
              stroke="#000"
              strokeWidth="1"
              strokeDasharray="2"
            />
          );
        }
      }
    }

    return columnElements;
  };

  return (
    <div className="visualization">
      <svg
        id="locker-visual"
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      >
        {/* Main locker outline */}
        <rect
          x={offsetX}
          y={offsetY}
          width={scaledWidth}
          height={scaledHeight}
          fill={color}
          stroke="#000"
          strokeWidth="2"
        />

        {/* Legs */}
        <rect
          x={offsetX}
          y={offsetY + scaledHeight}
          width={legsWidth * scale}
          height={scaledLegs}
          fill="#888"
          stroke="#444"
          strokeWidth="1"
        />
        <rect
          x={offsetX + scaledWidth - legsWidth * scale}
          y={offsetY + scaledHeight}
          width={legsWidth * scale}
          height={scaledLegs}
          fill="#888"
          stroke="#444"
          strokeWidth="1"
        />

        {/* Columns, doors, handles, shelves */}
        {renderColumns()}
      </svg>
      <div className="measurements">
        Width: {width}cm × Depth: {depth}cm × Height: {height}cm
      </div>
    </div>
  );
};

export default LockerVisualization;
