export interface Range {
  min: number;
  max: number;
  default: number;
}

export interface OptionsConfig<T> {
  options: T[];
  default: T;
}

export interface LockerConfig {
  HEIGHT: Range;
  WIDTH: Range;
  DEPTH: Range;
  LEGS_LENGTH: Range;
  LEGS_WIDTH: OptionsConfig<number>;
  COLUMNS: Range;
  SHELVES: Range;
  CLEANING_COLUMN_WIDTH: Range;
  CLEANING_COLUMN_POS: string[];
  DOOR_TYPES: string[];
  HANDLE_STYLES: string[];
}

export interface ColorOption {
  color: string;
  name: string;
}

export interface LockerState {
  height: number;
  width: number;
  depth: number;
  legsLength: number;
  legsWidth: number;
  columns: number;
  cleaningColumnPos: string;
  cleaningColumnWidth: number;
  shelves: number;
  color: string;
  colorName: string;
  doorType: string;
  handleStyle: string;
  includeCleaningColumn: boolean;
}
