import { parse } from "./parser.js";
import { calculateMetrics, applyMetricsToElement, buildDOMRows } from "./dom-renderer.js";
import { injectDefaultStyles } from "./styles.js";
import { toHtml } from "./html-renderer.js";

/**
 * Interactive viewer component for displaying and manipulating IRC/ANSI art.
 */
export class IrcViewer {
  #targetElement;
  #containerElement;
  #currentInput = null;
  #parsedResult = { columns: 0, rows: 0, cells: [] };
  #options = {};
  #metrics = null;

  /**
   * @param {HTMLElement} targetElement - DOM element container.
   * @param {object} [options={}] - Initial viewer options.
   */
  constructor(targetElement, options = {}) {
    if (!targetElement) {
      throw new Error("IrcViewer requires a valid target DOM element.");
    }
    this.#targetElement = targetElement;
    this.#options = {
      fontSize: 16,
      fontFamily: "monospace",
      autoMeasure: true,
      injectStyles: true,
      ...options,
    };

    if (this.#options.injectStyles !== false) {
      injectDefaultStyles();
    }

    this.#containerElement = document.createElement("div");
    this.#containerElement.className = this.#options.className ?? "irc2html-output";
    this.#containerElement.setAttribute("role", "img");
    this.#containerElement.setAttribute("aria-label", this.#options.ariaLabel ?? "Rendered terminal art");

    this.#targetElement.replaceChildren(this.#containerElement);

    if (options.art) {
      this.setArt(options.art);
    }
  }

  /**
   * Updates the art being displayed.
   * @param {string | Array<Array<object>> | object} input
   * @param {object} [options]
   */
  setArt(input, options = {}) {
    this.#currentInput = input;
    if (options) {
      this.#options = { ...this.#options, ...options };
    }

    this.#parsedResult = parse(input, this.#options);
    this.#updateTheme();
    this.#updateDisplay();
  }

  /**
   * Updates the display font size in px.
   * @param {number | string} size
   */
  setFontSize(size) {
    const next = typeof size === "number" ? size : parseFloat(size);
    if (!Number.isFinite(next) || next <= 0) return;
    this.#options.fontSize = next;
    this.#updateMetricsOnly();
  }

  /**
   * Updates the font family.
   * @param {string} family
   */
  setFontFamily(family) {
    this.#options.fontFamily = family || "monospace";
    this.#updateMetricsOnly();
  }

  /**
   * Sets color theme ('dark' | 'light' | 'transparent').
   * @param {'dark' | 'light' | 'transparent'} theme
   */
  setTheme(theme) {
    this.#options.theme = theme;
    this.#updateTheme();
  }

  /**
   * Updates multiple options at once.
   * @param {object} options
   */
  setOptions(options) {
    this.#options = { ...this.#options, ...options };
    if (options.format || options.palette || options.tabWidth || options.defaultForeground || options.defaultBackground) {
      this.setArt(this.#currentInput);
    } else {
      this.#updateTheme();
      this.#updateMetricsOnly();
    }
  }

  /**
   * Converts viewport client coordinates (from mouse/touch event) into cell (x, y) coordinates.
   * @param {number} clientX
   * @param {number} clientY
   * @returns {{ x: number, y: number, cell?: object } | undefined}
   */
  clientPointToCell(clientX, clientY) {
    const bounds = this.#containerElement.getBoundingClientRect();
    const columns = this.#parsedResult.columns;
    const rows = this.#parsedResult.rows;

    if (bounds.width <= 0 || bounds.height <= 0 || columns <= 0 || rows <= 0) {
      return undefined;
    }

    if (
      clientX < bounds.left ||
      clientX > bounds.right ||
      clientY < bounds.top ||
      clientY > bounds.bottom
    ) {
      return undefined;
    }

    const x = Math.max(0, Math.min(columns - 1, Math.floor(((clientX - bounds.left) * columns) / bounds.width)));
    const y = Math.max(0, Math.min(rows - 1, Math.floor(((clientY - bounds.top) * rows) / bounds.height)));

    const cell = this.getCell(x, y);
    return { x, y, cell };
  }

  /**
   * Retrieves the cell object at column x, row y.
   * @param {number} x
   * @param {number} y
   * @returns {object | undefined}
   */
  getCell(x, y) {
    const row = this.#parsedResult.cells[y];
    return row ? row[x] : undefined;
  }

  /**
   * Returns current grid dimensions and bounding size.
   * @returns {{ columns: number, rows: number, width?: number, height?: number }}
   */
  getDimensions() {
    return {
      columns: this.#parsedResult.columns,
      rows: this.#parsedResult.rows,
      width: this.#metrics?.width,
      height: this.#metrics?.height,
    };
  }

  /**
   * Returns the parsed character cell grid.
   * @returns {Array<Array<object>>}
   */
  getCells() {
    return this.#parsedResult.cells;
  }

  /**
   * Copies the rendered HTML string to the clipboard.
   * @returns {Promise<boolean>}
   */
  async copyHtml() {
    const html = toHtml(this.#parsedResult.cells, this.#options);
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(html);
      return true;
    }
    return false;
  }

  /**
   * Copies raw text characters (stripped of control codes) to the clipboard.
   * @returns {Promise<string>}
   */
  async copyText() {
    const rawText = this.#parsedResult.cells
      .map((row) => row.map((c) => c.character).join(""))
      .join("\n");
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(rawText);
    }
    return rawText;
  }

  /**
   * Clears the viewer.
   * @param {string} [placeholderMessage]
   */
  clear(placeholderMessage) {
    this.#parsedResult = { columns: 0, rows: 0, cells: [] };
    this.#currentInput = null;
    this.#containerElement.replaceChildren();
    if (placeholderMessage) {
      const msgEl = document.createElement("div");
      msgEl.style.padding = "20px";
      msgEl.style.opacity = "0.6";
      msgEl.textContent = placeholderMessage;
      this.#containerElement.append(msgEl);
    }
  }

  /**
   * Destroys the viewer and removes elements.
   */
  destroy() {
    this.#containerElement.remove();
    this.#targetElement.replaceChildren();
  }

  #updateTheme() {
    if (this.#options.theme === "light") {
      this.#containerElement.style.setProperty("--irc2html-bg", "#ffffff");
      this.#containerElement.style.setProperty("--irc2html-fg", "#000000");
    } else if (this.#options.theme === "transparent") {
      this.#containerElement.style.setProperty("--irc2html-bg", "transparent");
      this.#containerElement.style.removeProperty("--irc2html-fg");
    } else {
      this.#containerElement.style.removeProperty("--irc2html-bg");
      this.#containerElement.style.removeProperty("--irc2html-fg");
    }
  }

  #updateMetricsOnly() {
    this.#metrics = calculateMetrics(this.#options, this.#parsedResult.columns, this.#parsedResult.rows);
    applyMetricsToElement(this.#containerElement, this.#metrics, this.#parsedResult.columns, this.#parsedResult.rows);
  }

  #updateDisplay() {
    this.#metrics = calculateMetrics(this.#options, this.#parsedResult.columns, this.#parsedResult.rows);
    applyMetricsToElement(this.#containerElement, this.#metrics, this.#parsedResult.columns, this.#parsedResult.rows);

    const rowsFragment = buildDOMRows(this.#parsedResult.cells, this.#options);
    this.#containerElement.replaceChildren(rowsFragment);
  }
}
