import { parse } from "./parser.js";
import { injectDefaultStyles } from "./styles.js";
import { displayStyle, sameStyle } from "./utils.js";
import { rgbToString } from "./palettes.js";

// Terminal glyph size is a display property, independent of the raster size
// used while matching glyphs in WASM.
const DEFAULT_DISPLAY_FONT_SIZE = 16;
const DEFAULT_FONT_FAMILY = "Iosevka Fixed, monospace";
const DEFAULT_ASPECT_RATIO = 0.5;

export class OutputPreview {
  #stage;
  #canvas;
  #text;
  #placeholder;
  #mode = "text";
  #displayFontSize = DEFAULT_DISPLAY_FONT_SIZE;
  #fontFamily = DEFAULT_FONT_FAMILY;
  #bitmapMetrics;
  #textMetrics;
  #hasText = false;
  #measurementContext = null;

  /**
   * Accepts either:
   *  - new OutputPreview(targetElement, options)
   *  - new OutputPreview(stageElement, canvasElement, textElement, placeholderElement)
   */
  constructor(stageOrTarget, canvasOrOptions, text, placeholder) {
    if (!stageOrTarget) {
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

    if (canvasOrOptions instanceof HTMLElement && text instanceof HTMLElement) {
      // 4-argument signature from img2irc: (stage, canvas, text, placeholder)
      this.#stage = stageOrTarget;
      this.#canvas = canvasOrOptions;
      this.#text = text;
      this.#placeholder = placeholder;
    } else {
      // Single container signature
      this.#stage = stageOrTarget;
      const options = canvasOrOptions || {};
      this.#mode = options.mode === "bitmap" ? "bitmap" : "text";

      this.#canvas = document.createElement("canvas");
      this.#canvas.className = "output-canvas";
      this.#canvas.setAttribute("role", "img");
      this.#canvas.setAttribute("aria-label", "Rendered terminal art as bitmap canvas");
      this.#canvas.hidden = this.#mode !== "bitmap";

      this.#text = document.createElement("div");
      this.#text.className = "output-text";
      this.#text.setAttribute("role", "img");
      this.#text.setAttribute("aria-label", "Rendered terminal art as native browser text");
      this.#text.hidden = this.#mode !== "text";

      this.#stage.replaceChildren(this.#canvas, this.#text);

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

  setMode(mode) {
    this.#mode = mode === "bitmap" ? "bitmap" : "text";
    this.#updateVisibility();
  }

  getMode() {
    return this.#mode;
  }

  setFontFamily(family) {
    this.#fontFamily = family || DEFAULT_FONT_FAMILY;
    this.#text.style.fontFamily = `"${this.#fontFamily.replaceAll('"', '\\"')}", monospace`;
    if (this.#textMetrics) this.#applyTextDisplayMetrics(this.#textMetrics);
  }

  setOutputFontSize(value) {
    const next = Number(value);
    if (!Number.isFinite(next) || next <= 0) return;
    this.#displayFontSize = next;
    if (this.#bitmapMetrics) this.#applyBitmapDisplaySize(this.#bitmapMetrics);
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

      let naturalAdvance = fontSize * (options.aspectRatio ?? DEFAULT_ASPECT_RATIO);
      if (this.#measurementContext) {
        this.#measurementContext.font = `400 ${this.#displayFontSize}px "${this.#fontFamily.replaceAll('"', '\\"')}", monospace`;
        const measured = this.#measurementContext.measureText("M").width;
        if (measured > 0) naturalAdvance = measured;
      }

      const cellAdvance = options.cellAdvance ?? (options.aspectRatio !== undefined ? fontSize * options.aspectRatio : naturalAdvance);
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

    this.#drawBitmap(result);

    if (result && result.cells) {
      let naturalAdvance = this.#displayFontSize * DEFAULT_ASPECT_RATIO;
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

  #drawBitmap(result) {
    if (!this.#canvas || !result) {
      if (this.#canvas) {
        this.#canvas.width = 0;
        this.#canvas.height = 0;
      }
      this.#bitmapMetrics = undefined;
      return;
    }

    // 1. Direct RGBA buffer from WASM/renderer
    if (result.previewRgba?.length && result.previewWidth && result.previewHeight) {
      const expectedBytes = result.previewWidth * result.previewHeight * 4;
      if (result.previewRgba.byteLength === expectedBytes) {
        this.#canvas.width = result.previewWidth;
        this.#canvas.height = result.previewHeight;
        const context = this.#canvas.getContext("2d", { alpha: false });
        context.imageSmoothingEnabled = false;
        const pixels = new Uint8ClampedArray(
          result.previewRgba.buffer,
          result.previewRgba.byteOffset,
          result.previewRgba.byteLength,
        );
        context.putImageData(new ImageData(pixels, result.previewWidth, result.previewHeight), 0, 0);

        this.#bitmapMetrics = {
          previewWidth: result.previewWidth,
          previewHeight: result.previewHeight,
          columns: result.columns,
          rows: result.rows,
          renderFontSize: result.fontSize,
          cellAdvance: result.cellAdvance,
          lineHeight: result.lineHeight,
        };
        this.#applyBitmapDisplaySize(this.#bitmapMetrics);
        return;
      }
    }

    // 2. Client-side canvas rasterizer for character cells
    if (result.cells && result.cells.length > 0) {
      const columns = result.columns;
      const rows = result.rows;
      const fontSize = result.fontSize ?? this.#displayFontSize;
      const cellAdvance = result.cellAdvance ?? (fontSize * DEFAULT_ASPECT_RATIO);
      const lineHeight = result.lineHeight ?? fontSize;

      const cellWidth = Math.max(1, Math.round(cellAdvance));
      const cellHeight = Math.max(1, Math.round(lineHeight));
      const totalWidth = columns * cellWidth;
      const totalHeight = rows * cellHeight;

      if (totalWidth <= 0 || totalHeight <= 0) {
        this.#canvas.width = 0;
        this.#canvas.height = 0;
        this.#bitmapMetrics = undefined;
        return;
      }

      this.#canvas.width = totalWidth;
      this.#canvas.height = totalHeight;
      const ctx = this.#canvas.getContext("2d", { alpha: false });
      ctx.imageSmoothingEnabled = false;
      ctx.textBaseline = "top";

      const defaultFg = [255, 255, 255];
      const defaultBg = [0, 0, 0];

      for (let r = 0; r < result.cells.length; r++) {
        const row = result.cells[r];
        const y = r * cellHeight;

        for (let c = 0; c < row.length; c++) {
          const cell = row[c];
          const x = c * cellWidth;
          const style = displayStyle(cell, defaultFg, defaultBg);

          // Draw background cell
          ctx.fillStyle = rgbToString(style.background, defaultBg);
          ctx.fillRect(x, y, cellWidth, cellHeight);

          // Draw glyph character
          if (cell.character && cell.character !== " ") {
            ctx.save();
            ctx.beginPath();
            ctx.rect(x, y, cellWidth, cellHeight);
            ctx.clip();
            ctx.fillStyle = rgbToString(style.foreground, defaultFg);
            ctx.font = `${style.bold ? "700 " : "400 "}${style.italic ? "italic " : ""}${fontSize}px "${this.#fontFamily.replaceAll('"', '\\"')}", monospace`;
            ctx.fillText(cell.character, x, y);
            ctx.restore();
          }
        }
      }

      this.#bitmapMetrics = {
        previewWidth: totalWidth,
        previewHeight: totalHeight,
        columns,
        rows,
        renderFontSize: fontSize,
        cellAdvance,
        lineHeight,
      };
      this.#applyBitmapDisplaySize(this.#bitmapMetrics);
      return;
    }

    this.#canvas.width = 0;
    this.#canvas.height = 0;
    this.#bitmapMetrics = undefined;
  }

  #applyBitmapDisplaySize(result) {
    if (!this.#canvas) return;
    const scale = result.renderFontSize > 0 ? this.#displayFontSize / result.renderFontSize : 1;
    const width = result.columns * result.cellAdvance * scale;
    const height = result.rows * result.lineHeight * scale;
    this.#canvas.style.width = `${width}px`;
    this.#canvas.style.height = `${height}px`;
    if (this.#mode === "bitmap") this.#setStageSize(width, height);
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
        const cellElement = document.createElement("span");
        cellElement.className = "output-text-cell";
        cellElement.append(document.createTextNode(cell.character ?? ""));
        run.append(cellElement);
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
      this.#measurementContext.font = `400 ${this.#displayFontSize}px "${this.#fontFamily.replaceAll('"', '\\"')}"`;
      naturalAdvance = this.#measurementContext.measureText("M").width;
    }
    this.#text.style.fontSize = `${this.#displayFontSize}px`;
    this.#text.style.letterSpacing = `${cellAdvance - naturalAdvance}px`;
    this.#text.style.lineHeight = `${lineHeight}px`;
    this.#text.style.width = `${result.columns * cellAdvance}px`;
    this.#text.style.height = `${result.rows * lineHeight}px`;
    this.#text.style.setProperty("--output-line-height", `${lineHeight}px`);
    this.#text.style.setProperty("--output-cell-advance", `${cellAdvance}px`);
    if (this.#mode === "text") {
      this.#setStageSize(result.columns * cellAdvance, result.rows * lineHeight);
    }
  }

  #setStageSize(width, height) {
    if (this.#stage) {
      this.#stage.style.width = `${width}px`;
      this.#stage.style.height = `${height}px`;
    }
  }

  #updateVisibility() {
    const showText = this.#mode === "text" && this.#hasText;
    const showBitmap = this.#mode === "bitmap" && Boolean(this.#bitmapMetrics);
    this.#text.hidden = !showText;
    if (this.#canvas) this.#canvas.hidden = !showBitmap;
    if (showText && this.#textMetrics) {
      this.#applyTextDisplayMetrics(this.#textMetrics);
    } else if (showBitmap && this.#bitmapMetrics) {
      this.#applyBitmapDisplaySize(this.#bitmapMetrics);
    } else {
      this.#setStageSize(0, 0);
    }
    if (this.#placeholder) {
      this.#placeholder.textContent = this.#mode === "text"
        ? "Render once to create the native-text preview."
        : "Rendered output will appear here.";
      this.#placeholder.hidden = showText || showBitmap;
    }
  }

  clear(message = "Rendered output will appear here.") {
    this.#bitmapMetrics = undefined;
    this.#textMetrics = undefined;
    this.#hasText = false;
    if (this.#canvas) {
      this.#canvas.width = 0;
      this.#canvas.height = 0;
      this.#canvas.hidden = true;
    }
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
    const cols = columns ?? (this.#mode === "text" ? this.#textMetrics?.columns : this.#bitmapMetrics?.columns) ?? 0;
    const rws = rows ?? (this.#mode === "text" ? this.#textMetrics?.rows : this.#bitmapMetrics?.rows) ?? 0;

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
