import { parse } from "./parser.js";
import { injectDefaultStyles } from "./styles.js";
import { displayStyle, sameStyle } from "./utils.js";
import { rgbToString } from "./palettes.js";

// Terminal glyph size is a display property, independent of the raster size
// used while matching glyphs in WASM.
const DEFAULT_DISPLAY_FONT_SIZE = 16;

export class OutputPreview {
  #stage;
  #text;
  #placeholder;
  #displayFontSize = DEFAULT_DISPLAY_FONT_SIZE;
  #fontFamily = "Cascadia Code, monospace";
  #textMetrics;
  #hasText = false;
  #measurementContext = null;

  /**
   * Accepts either:
   *  - new OutputPreview(targetElement, options)
   *  - new OutputPreview(stageElement, textElement, placeholderElement)
   */
  constructor(targetOrStage, textOrOptions, placeholder) {
    if (!targetOrStage) {
      throw new Error("OutputPreview requires a target DOM element.");
    }

    if (typeof document !== "undefined") {
      try {
        this.#measurementContext = document.createElement("canvas").getContext("2d");
      } catch {
        this.#measurementContext = null;
      }
      injectDefaultStyles();
    }

    if (textOrOptions instanceof HTMLElement) {
      // 3-argument signature from img2irc: (stage, text, placeholder)
      this.#stage = targetOrStage;
      this.#text = textOrOptions;
      this.#placeholder = placeholder;
    } else {
      // Single container signature
      this.#stage = targetOrStage;
      const options = textOrOptions || {};
      
      this.#text = document.createElement("div");
      this.#text.className = "output-text";
      this.#text.setAttribute("role", "img");
      this.#text.setAttribute("aria-label", "Rendered terminal art as native browser text");
      
      this.#stage.replaceChildren(this.#text);
      
      if (options.fontFamily) {
        this.setFontFamily(options.fontFamily);
      } else {
        this.#text.style.fontFamily = `"${this.#fontFamily.replaceAll('"', '\\"')}", monospace`;
      }
      if (options.fontSize) {
        this.setOutputFontSize(options.fontSize);
      }
    }
  }

  setFontFamily(family) {
    this.#fontFamily = family || "Cascadia Code, monospace";
    this.#text.style.fontFamily = `"${this.#fontFamily.replaceAll('"', '\\"')}", monospace`;
    if (this.#textMetrics) this.#applyTextDisplayMetrics(this.#textMetrics);
  }

  setOutputFontSize(value) {
    const next = Number(value);
    if (!Number.isFinite(next) || next <= 0) return;
    this.#displayFontSize = next;
    if (this.#textMetrics) this.#applyTextDisplayMetrics(this.#textMetrics);
  }

  /**
   * Draws raw art string or parsed result object.
   * @param {string | object} resultOrArt
   * @param {object} [options]
   */
  draw(resultOrArt, options = {}) {
    let result;

    if (typeof resultOrArt === "string") {
      const parsed = parse(resultOrArt, options);
      const fontSize = options.fontSize ?? this.#displayFontSize;
      
      let naturalAdvance = fontSize * 0.6;
      if (this.#measurementContext) {
        this.#measurementContext.font = `400 ${this.#displayFontSize}px "${this.#fontFamily.replaceAll('"', '\\"')}", monospace`;
        const measured = this.#measurementContext.measureText("M").width;
        if (measured > 0) naturalAdvance = measured;
      }

      const cellAdvance = options.cellAdvance ?? naturalAdvance;
      const lineHeight = options.lineHeight ?? fontSize;

      result = {
        columns: parsed.columns,
        rows: parsed.rows,
        renderFontSize: fontSize,
        fontSize,
        cellAdvance,
        lineHeight,
        cells: parsed.cells,
      };
    } else {
      result = resultOrArt;
    }

    if (result && result.cells) {
      let naturalAdvance = this.#displayFontSize * 0.6;
      if (this.#measurementContext) {
        this.#measurementContext.font = `400 ${this.#displayFontSize}px "${this.#fontFamily.replaceAll('"', '\\"')}", monospace`;
        const measured = this.#measurementContext.measureText("M").width;
        if (measured > 0) naturalAdvance = measured;
      }

      this.#textMetrics = {
        columns: result.columns,
        rows: result.rows,
        renderFontSize: result.renderFontSize ?? result.fontSize ?? this.#displayFontSize,
        cellAdvance: result.cellAdvance ?? naturalAdvance,
        lineHeight: result.lineHeight ?? this.#displayFontSize,
      };
      this.#applyTextDisplayMetrics(this.#textMetrics);
      this.#drawText(result.cells);
    } else {
      this.#text.replaceChildren();
      this.#textMetrics = undefined;
      this.#hasText = false;
    }
    this.#updateVisibility();
  }

  /**
   * Alias for draw.
   */
  render(resultOrArt, options) {
    this.draw(resultOrArt, options);
  }

  hasText() {
    return this.#hasText;
  }

  #drawText(rows) {
    const documentFragment = document.createDocumentFragment();
    for (const cells of rows) {
      const row = document.createElement("div");
      row.className = "output-text-row";
      let run;
      let runStyle;
      for (const cell of cells) {
        const style = displayStyle(cell);
        if (!run || !sameStyle(style, runStyle)) {
          run = document.createElement("span");
          run.className = "output-text-run";
          run.style.color = rgbToString(style.foreground, [255, 255, 255]);
          run.style.backgroundColor = rgbToString(style.background, [0, 0, 0]);
          run.style.fontWeight = style.bold ? "700" : "400";
          run.style.fontStyle = style.italic ? "italic" : "normal";
          run.style.textDecoration = style.underline ? "underline" : "none";
          row.append(run);
          runStyle = style;
        }
        run.append(document.createTextNode(cell.character));
      }
      documentFragment.append(row);
    }
    this.#text.replaceChildren(documentFragment);
    this.#hasText = rows.length > 0;
  }

  #applyTextDisplayMetrics(result) {
    const scale = result.renderFontSize > 0 ? this.#displayFontSize / result.renderFontSize : 1;
    const cellAdvance = result.cellAdvance * scale;
    const lineHeight = result.lineHeight * scale;
    let naturalAdvance = cellAdvance;
    if (this.#measurementContext) {
      this.#measurementContext.font = `400 ${this.#displayFontSize}px "${this.#fontFamily.replaceAll('"', '\\"')}", monospace`;
      naturalAdvance = this.#measurementContext.measureText("M").width;
    }
    this.#text.style.fontSize = `${this.#displayFontSize}px`;
    this.#text.style.letterSpacing = `${cellAdvance - naturalAdvance}px`;
    this.#text.style.lineHeight = `${lineHeight}px`;
    this.#text.style.width = `${result.columns * cellAdvance}px`;
    this.#text.style.height = `${result.rows * lineHeight}px`;
    this.#text.style.setProperty("--output-line-height", `${lineHeight}px`);
    this.#setStageSize(result.columns * cellAdvance, result.rows * lineHeight);
  }

  #setStageSize(width, height) {
    if (this.#stage) {
      this.#stage.style.width = `${width}px`;
      this.#stage.style.height = `${height}px`;
    }
  }

  #updateVisibility() {
    const showText = this.#hasText;
    this.#text.hidden = !showText;
    if (showText && this.#textMetrics) {
      this.#applyTextDisplayMetrics(this.#textMetrics);
    } else {
      this.#setStageSize(0, 0);
    }
    if (this.#placeholder) {
      this.#placeholder.textContent = "Render once to create the native-text preview.";
      this.#placeholder.hidden = showText;
    }
  }

  clear(message = "Rendered output will appear here.") {
    this.#textMetrics = undefined;
    this.#hasText = false;
    this.#text.replaceChildren();
    this.#text.hidden = true;
    this.#setStageSize(0, 0);
    if (this.#placeholder) {
      this.#placeholder.textContent = message;
      this.#placeholder.hidden = false;
    }
  }

  clientPointToCell(clientX, clientY, columns, rows) {
    const bounds = this.#stage.getBoundingClientRect();
    const cols = columns ?? this.#textMetrics?.columns ?? 0;
    const rws = rows ?? this.#textMetrics?.rows ?? 0;

    if (bounds.width <= 0 || bounds.height <= 0 || cols <= 0 || rws <= 0) return undefined;
    return {
      x: Math.max(0, Math.min(cols - 1, Math.floor(((clientX - bounds.left) * cols) / bounds.width))),
      y: Math.max(0, Math.min(rws - 1, Math.floor(((clientY - bounds.top) * rws) / bounds.height))),
    };
  }
}

/**
 * Convenience function to render raw IRC/ANSI art into any target element.
 * @param {string | object} rawArtOrResult
 * @param {HTMLElement} targetElement
 * @param {object} [options]
 * @returns {OutputPreview}
 */
export function render(rawArtOrResult, targetElement, options = {}) {
  const preview = new OutputPreview(targetElement, options);
  preview.draw(rawArtOrResult, options);
  return preview;
}

export { render as renderTo };
