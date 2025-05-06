import { COLOR_OPTIONS, CONFIG } from "../config/config";
import type { LockerState } from "../types/types";

export const toQueryString = (params: LockerState): string => {
  return Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
};

export const getParamsFromUrl = (): Partial<LockerState> => {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const result: Partial<LockerState> = {};

  // Helper functions
  const clamp = (val: string | null, min: number, max: number): number => {
    const num = Number(val);
    if (isNaN(num)) return min;
    return Math.max(min, Math.min(max, num));
  };

  const pick = <T>(val: string | null, allowed: T[], fallback: T): T => {
    return val && allowed.includes(val as unknown as T)
      ? (val as unknown as T)
      : fallback;
  };

  // Parse parameters
  if (params.has("height")) {
    result.height = clamp(
      params.get("height"),
      CONFIG.HEIGHT.min,
      CONFIG.HEIGHT.max
    );
  }

  if (params.has("width")) {
    result.width = clamp(
      params.get("width"),
      CONFIG.WIDTH.min,
      CONFIG.WIDTH.max
    );
  }

  if (params.has("depth")) {
    result.depth = clamp(
      params.get("depth"),
      CONFIG.DEPTH.min,
      CONFIG.DEPTH.max
    );
  }

  if (params.has("legsLength")) {
    result.legsLength = clamp(
      params.get("legsLength"),
      CONFIG.LEGS_LENGTH.min,
      CONFIG.LEGS_LENGTH.max
    );
  }

  if (params.has("legsWidth")) {
    result.legsWidth = Number(
      pick(
        params.get("legsWidth"),
        CONFIG.LEGS_WIDTH.options.map(String),
        CONFIG.LEGS_WIDTH.default.toString()
      )
    );
  }

  if (params.has("columns")) {
    result.columns = clamp(
      params.get("columns"),
      CONFIG.COLUMNS.min,
      CONFIG.COLUMNS.max
    );
  }

  if (params.has("cleaningColumnPos")) {
    result.cleaningColumnPos = pick(
      params.get("cleaningColumnPos"),
      CONFIG.CLEANING_COLUMN_POS,
      CONFIG.CLEANING_COLUMN_POS[2]
    );
  }

  if (params.has("shelves")) {
    result.shelves = clamp(
      params.get("shelves"),
      CONFIG.SHELVES.min,
      CONFIG.SHELVES.max
    );
  }

  if (params.has("color")) {
    const colorParam = params.get("color")?.toLowerCase();
    const colorOption = COLOR_OPTIONS.find(
      (opt) => opt.color.toLowerCase() === colorParam
    );

    if (colorOption) {
      result.color = colorOption.color;
      result.colorName = colorOption.name;
    }
  }

  if (params.has("doorType")) {
    result.doorType = pick(
      params.get("doorType"),
      CONFIG.DOOR_TYPES,
      CONFIG.DOOR_TYPES[0]
    );
  }

  if (params.has("handleStyle")) {
    result.handleStyle = pick(
      params.get("handleStyle"),
      CONFIG.HANDLE_STYLES,
      CONFIG.HANDLE_STYLES[0]
    );
  }

  if (params.has("includeCleaningColumn")) {
    result.includeCleaningColumn =
      params.get("includeCleaningColumn") === "true";
  }

  return result;
};

export const updateUrlWithState = (state: LockerState): void => {
  const url = `${window.location.origin}${
    window.location.pathname
  }?${toQueryString(state)}`;
  window.history.replaceState({}, "", url);
};
