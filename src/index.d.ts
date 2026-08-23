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

export interface RenderResult {
  columns: number;
  rows: number;
  fontSize?: number;
  cellAdvance?: number;
  lineHeight?: number;
  cells: Cell[][];
}

export interface RenderOptions {
  fontSize?: number;
  fontFamily?: string;
  cellAdvance?: number;
  lineHeight?: number;
  aspectRatio?: number;
  format?: "auto" | "irc" | "ansi" | "plain";
  palette?: RgbColor[];
  defaultForeground?: RgbColor;
  defaultBackground?: RgbColor;
  tabWidth?: number;
  trimTrailingSpaces?: boolean;
  trimTrailingEmptyRows?: boolean;
  inlineStyles?: boolean;
  includeCss?: boolean;
  title?: string;
}

export class OutputPreview {
  constructor(targetElement: HTMLElement, options?: RenderOptions);
  constructor(stageElement: HTMLElement, textElement: HTMLElement, placeholderElement?: HTMLElement);
  setFontFamily(family: string): void;
  setOutputFontSize(size: number | string): void;
  draw(resultOrArt: string | RenderResult, options?: RenderOptions): void;
  render(resultOrArt: string | RenderResult, options?: RenderOptions): void;
  hasText(): boolean;
  clear(message?: string): void;
  clientPointToCell(clientX: number, clientY: number, columns?: number, rows?: number): { x: number; y: number } | undefined;
}

export function render(rawArtOrResult: string | RenderResult, targetElement: HTMLElement, options?: RenderOptions): OutputPreview;
export function renderTo(rawArtOrResult: string | RenderResult, targetElement: HTMLElement, options?: RenderOptions): OutputPreview;

export function parse(input: string | Cell[][] | { cells?: Cell[][] }, options?: RenderOptions): ParsedGrid;
export function parseIrc(text: string, options?: RenderOptions): ParsedGrid;
export function parseAnsi(text: string, options?: RenderOptions): ParsedGrid;

export function toHtml(input: string | Cell[][] | RenderResult, options?: RenderOptions): string;
export function toHtmlDocument(input: string | Cell[][] | RenderResult, options?: RenderOptions): string;

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
export function displayStyle(cell: Cell): { foreground: RgbColor; background: RgbColor; bold?: boolean; italic?: boolean; underline?: boolean };
export function sameStyle(left: object, right: object): boolean;
export function detectFormat(text: string): "ansi" | "irc" | "plain";
