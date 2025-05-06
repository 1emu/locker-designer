import type { ColorOption, LockerConfig } from "../types/types";

export const CONFIG: LockerConfig = {
  HEIGHT: { min: 60, max: 200, default: 180 },
  WIDTH: { min: 35, max: 400, default: 120 },
  DEPTH: { min: 38, max: 60, default: 52 },
  LEGS_LENGTH: { min: 0, max: 20, default: 10 },
  LEGS_WIDTH: { options: [2, 10], default: 2 },
  COLUMNS: { min: 2, max: 5, default: 3 },
  SHELVES: { min: 3, max: 6, default: 4 },
  CLEANING_COLUMN_POS: ["left", "middle", "right"],
  DOOR_TYPES: ["standard", "perforated", "glass"],
  HANDLE_STYLES: ["vertical", "horizontal", "recessed"],
};

export const COLOR_OPTIONS: ColorOption[] = [
  { color: "#F5F5F0", name: "Blanco Sucio" },
  { color: "#F7F3D7", name: "Beige" },
  { color: "#FFFDD0", name: "Crema" },
  { color: "#FFFF54", name: "Amarillo" },
  { color: "#BDBDBD", name: "Gris Claro" },
  { color: "#F6C6C6", name: "Rosa Pastel" },
  { color: "#B6E8F7", name: "Celeste Pastel" },
  { color: "#B6B6E8", name: "Violeta Pastel" },
  { color: "#B6E8C6", name: "Verde agua" },
  { color: "#5B7F5B", name: "Verde Medio" },
  { color: "#3C5B3C", name: "Verde Ingles" },
  { color: "#FFA726", name: "Naranja" },
  { color: "#F44336", name: "Rojo" },
  { color: "#E25822", name: "Bermellón" },
  { color: "#6D6A6A", name: "Gris Topo" },
  { color: "#7B4A12", name: "Marrón Brillante" },
  { color: "#0000FF", name: "Azul Brillante" },
  { color: "#000000", name: "Negro" },
];
