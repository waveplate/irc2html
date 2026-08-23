export type RgbColor = [number, number, number];

export interface Cell {
  character: string;
  foreground?: RgbColor;
  background?: RgbColor;
  bold?: boolean;
  dim?: boolean;
  italic?: boolean;
  underline?: boolean;
  inverted?: boolean;
  strikethrough?: boolean;
  hidden?: boolean;
}

export interface ParsedGrid {
  columns: number;
  rows: number;
  cells: Cell[][];
}

export type ArtFormat = "auto" | "irc" | "ansi" | "plain";
export type ArtTheme = "dark" | "light" | "transparent";

export interface ParserOptions {
  format?: ArtFormat;
  palette?: RgbColor[];
  defaultForeground?: RgbColor;
  defaultBackground?: RgbColor;
  tabWidth?: number;
  trimTrailingSpaces?: boolean;
  trimTrailingEmptyRows?: boolean;
}

export interface RenderMetrics {
  fontSize: number;
  fontFamily: string;
  cellAdvance: number;
  lineHeight: number;
  letterSpacing: string;
  width?: number;
  height?: number;
}

export interface RenderOptions extends ParserOptions {
  fontSize?: number | string;
  fontFamily?: string;
  cellAdvance?: number;
  lineHeight?: number;
  letterSpacing?: number | string;
  aspectRatio?: number;
  autoMeasure?: boolean;
  theme?: ArtTheme;
  className?: string;
  rowClassName?: string;
  runClassName?: string;
  ariaLabel?: string;
  injectStyles?: boolean;
  inlineStyles?: boolean;
  includeCss?: boolean;
  title?: string;
  art?: string | Cell[][] | { cells?: Cell[][]; grid?: Cell[][] };
}

export interface RenderResult {
  columns: number;
  rows: number;
  cells: Cell[][];
  container: HTMLDivElement;
}

export interface CellCoordinate {
  x: number;
  y: number;
  cell?: Cell;
}

export function parseIrc(text: string, options?: ParserOptions): ParsedGrid;
export function parseAnsi(text: string, options?: ParserOptions): ParsedGrid;
export function parse(input: string | Cell[][] | { cells?: Cell[][]; grid?: Cell[][] }, options?: ParserOptions): ParsedGrid;

export function toDOM(input: string | Cell[][] | { cells?: Cell[][]; grid?: Cell[][] }, options?: RenderOptions): HTMLDivElement;
export function renderTo(input: string | Cell[][] | { cells?: Cell[][]; grid?: Cell[][] }, targetElement: HTMLElement, options?: RenderOptions): RenderResult;
export function render(input: string | Cell[][] | { cells?: Cell[][]; grid?: Cell[][] }, targetElement: HTMLElement, options?: RenderOptions): RenderResult;

export function toHtml(input: string | Cell[][] | { cells?: Cell[][]; grid?: Cell[][] }, options?: RenderOptions): string;
export function toHtmlDocument(input: string | Cell[][] | { cells?: Cell[][] }, options?: RenderOptions): string;

export function calculateMetrics(options?: RenderOptions, columns?: number, rows?: number): RenderMetrics;
export function applyMetricsToElement(element: HTMLElement, metrics: RenderMetrics, columns?: number, rows?: number): void;
export function buildDOMRows(cellRows: Cell[][], options?: RenderOptions): DocumentFragment;

export class IrcViewer {
  constructor(targetElement: HTMLElement, options?: RenderOptions);
  setArt(input: string | Cell[][] | { cells?: Cell[][]; grid?: Cell[][] }, options?: RenderOptions): void;
  setFontSize(size: number | string): void;
  setFontFamily(family: string): void;
  setTheme(theme: ArtTheme): void;
  setOptions(options: RenderOptions): void;
  clientPointToCell(clientX: number, clientY: number): CellCoordinate | undefined;
  getCell(x: number, y: number): Cell | undefined;
  getDimensions(): { columns: number; rows: number; width?: number; height?: number };
  getCells(): Cell[][];
  copyHtml(): Promise<boolean>;
  copyText(): Promise<string>;
  clear(placeholderMessage?: string): void;
  destroy(): void;
}

export { IrcViewer as IrcArtViewer };

export const DEFAULT_CSS: string;
export function injectDefaultStyles(doc?: Document): HTMLStyleElement | undefined;

export const IRC99_HEX: number[];
export const ANSI256_HEX: number[];
export const IRC99_PALETTE: RgbColor[];
export const MIRC16_PALETTE: RgbColor[];
export const ANSI256_PALETTE: RgbColor[];
export const ANSI16_PALETTE: RgbColor[];

export function rgbToString(color?: RgbColor | null, fallback?: RgbColor): string;
export function rgbToHex(color?: RgbColor | null, fallback?: string): string;
export function hexNumberToRgb(hex: number): RgbColor;
export function parseHexString(str: string): RgbColor | undefined;
export function getIrcColor(index: number, palette?: RgbColor[]): RgbColor | undefined;
export function getAnsiColor(index: number, palette?: RgbColor[]): RgbColor | undefined;

export function escapeHtml(str: string): string;
export function displayStyle(cell: Cell, defaultFg?: RgbColor, defaultBg?: RgbColor): object;
export function sameStyle(left: object, right: object): boolean;
export function detectFormat(text: string): ArtFormat;
