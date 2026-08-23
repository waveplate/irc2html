import { parse } from "./parser.js";
import { rgbToString } from "./palettes.js";
import { displayStyle, sameStyle } from "./utils.js";
import { injectDefaultStyles } from "./styles.js";

let sharedMeasurementContext = null;

function getMeasurementContext() {
  if (typeof document === "undefined") return null;
  if (!sharedMeasurementContext) {
    try {
      const canvas = document.createElement("canvas");
      sharedMeasurementContext = canvas.getContext("2d");
    } catch {
      sharedMeasurementContext = null;
    }
  }
  return sharedMeasurementContext;
}

/**
 * Calculates display metrics for the character grid.
 *
 * @param {object} options
 * @param {number} fontSize
 * @param {string} fontFamily
 * @returns {{ fontSize: number, cellAdvance: number, lineHeight: number, letterSpacing: string, width?: number, height?: number }}
 */
export function calculateMetrics(options = {}, columns = 0, rows = 0) {
  const fontSize = typeof options.fontSize === "number"
    ? options.fontSize
    : (options.fontSize ? parseFloat(options.fontSize) : 16) || 16;

  const fontFamily = options.fontFamily || "monospace";

  // Aspect ratio of standard terminal monospace fonts is typically ~0.5 to 0.6
  const aspectRatio = options.aspectRatio ?? 0.55;
  const rawCellAdvance = options.cellAdvance ?? (fontSize * aspectRatio);
  const rawLineHeight = options.lineHeight ?? (fontSize * 1.0);

  let letterSpacing = options.letterSpacing;

  if (letterSpacing === undefined && options.autoMeasure !== false) {
    const ctx = getMeasurementContext();
    if (ctx) {
      ctx.font = `400 ${fontSize}px "${fontFamily.replaceAll('"', '\\"')}", monospace`;
      const naturalAdvance = ctx.measureText("M").width;
      if (naturalAdvance > 0) {
        letterSpacing = `${rawCellAdvance - naturalAdvance}px`;
      }
    }
  }

  if (letterSpacing === undefined) {
    letterSpacing = "0px";
  } else if (typeof letterSpacing === "number") {
    letterSpacing = `${letterSpacing}px`;
  }

  return {
    fontSize,
    fontFamily,
    cellAdvance: rawCellAdvance,
    lineHeight: rawLineHeight,
    letterSpacing,
    width: columns > 0 ? columns * rawCellAdvance : undefined,
    height: rows > 0 ? rows * rawLineHeight : undefined,
  };
}

/**
 * Applies computed metrics to an output container element.
 *
 * @param {HTMLElement} element
 * @param {object} metrics
 * @param {number} [columns]
 * @param {number} [rows]
 */
export function applyMetricsToElement(element, metrics, columns = 0, rows = 0) {
  if (!element || !element.style) return;

  element.style.fontSize = `${metrics.fontSize}px`;
  element.style.fontFamily = `"${metrics.fontFamily.replaceAll('"', '\\"')}", monospace`;
  element.style.lineHeight = `${metrics.lineHeight}px`;
  element.style.letterSpacing = metrics.letterSpacing;
  element.style.setProperty("--irc2html-font-size", `${metrics.fontSize}px`);
  element.style.setProperty("--irc2html-font-family", `"${metrics.fontFamily.replaceAll('"', '\\"')}", monospace`);
  element.style.setProperty("--irc2html-line-height", `${metrics.lineHeight}px`);
  element.style.setProperty("--irc2html-letter-spacing", metrics.letterSpacing);

  if (columns > 0 && metrics.cellAdvance > 0) {
    element.style.width = `${columns * metrics.cellAdvance}px`;
  }
  if (rows > 0 && metrics.lineHeight > 0) {
    element.style.height = `${rows * metrics.lineHeight}px`;
  }
}

/**
 * Converts parsed character cells into a DocumentFragment of rows and spans.
 *
 * @param {Array<Array<object>>} cellRows
 * @param {object} [options={}]
 * @returns {DocumentFragment}
 */
export function buildDOMRows(cellRows, options = {}) {
  if (typeof document === "undefined") {
    throw new Error("buildDOMRows requires a DOM environment with document support.");
  }

  const defaultForeground = options.defaultForeground ?? [255, 255, 255];
  const defaultBackground = options.defaultBackground ?? [0, 0, 0];
  const rowClassName = options.rowClassName ?? "irc2html-row";
  const runClassName = options.runClassName ?? "irc2html-run";

  const fragment = document.createDocumentFragment();

  for (const cells of cellRows) {
    const rowEl = document.createElement("div");
    rowEl.className = rowClassName;

    let currentRun = null;
    let currentStyle = null;
    let accumulatedText = "";

    const flushRun = () => {
      if (currentRun && accumulatedText.length > 0) {
        currentRun.append(document.createTextNode(accumulatedText));
        accumulatedText = "";
      }
    };

    for (const cell of cells) {
      const style = displayStyle(cell, defaultForeground, defaultBackground);

      if (!currentRun || !sameStyle(style, currentStyle)) {
        flushRun();

        currentRun = document.createElement("span");
        currentRun.className = runClassName;
        currentRun.style.color = rgbToString(style.foreground, defaultForeground);
        currentRun.style.backgroundColor = rgbToString(style.background, defaultBackground);

        if (style.bold) currentRun.style.fontWeight = "700";
        if (style.italic) currentRun.style.fontStyle = "italic";
        if (style.underline) currentRun.style.textDecoration = "underline";
        if (style.strikethrough) {
          currentRun.style.textDecoration = (currentRun.style.textDecoration ? currentRun.style.textDecoration + " " : "") + "line-through";
        }
        if (style.hidden) currentRun.style.visibility = "hidden";

        rowEl.append(currentRun);
        currentStyle = style;
      }

      accumulatedText += cell.character;
    }

    flushRun();
    fragment.append(rowEl);
  }

  return fragment;
}

/**
 * Creates and returns a complete rendered DOM element for IRC / ANSI art.
 *
 * @param {string | Array<Array<object>> | object} input
 * @param {object} [options={}]
 * @returns {HTMLDivElement}
 */
export function toDOM(input, options = {}) {
  if (typeof document === "undefined") {
    throw new Error("toDOM requires a DOM environment.");
  }

  if (options.injectStyles !== false) {
    injectDefaultStyles();
  }

  const parsed = parse(input, options);
  const container = document.createElement("div");
  container.className = options.className ?? "irc2html-output";
  container.setAttribute("role", "img");
  container.setAttribute("aria-label", options.ariaLabel ?? "Rendered terminal art");

  if (options.theme === "light") {
    container.style.setProperty("--irc2html-bg", "#ffffff");
    container.style.setProperty("--irc2html-fg", "#000000");
  } else if (options.theme === "transparent") {
    container.style.setProperty("--irc2html-bg", "transparent");
  }

  const metrics = calculateMetrics(options, parsed.columns, parsed.rows);
  applyMetricsToElement(container, metrics, parsed.columns, parsed.rows);

  const domRows = buildDOMRows(parsed.cells, options);
  container.append(domRows);

  return container;
}

/**
 * Renders IRC / ANSI art directly into a target DOM element.
 *
 * @param {string | Array<Array<object>> | object} input - Raw text or parsed grid.
 * @param {HTMLElement} targetElement - DOM element to render into.
 * @param {object} [options={}] - Render options.
 * @returns {{ columns: number, rows: number, cells: Array<Array<object>>, container: HTMLDivElement }}
 */
export function renderTo(input, targetElement, options = {}) {
  if (!targetElement) {
    throw new Error("renderTo requires a valid target DOM element.");
  }

  const domContainer = toDOM(input, options);
  targetElement.replaceChildren(domContainer);

  const parsed = parse(input, options);
  return {
    columns: parsed.columns,
    rows: parsed.rows,
    cells: parsed.cells,
    container: domContainer,
  };
}
