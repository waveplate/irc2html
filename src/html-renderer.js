import { parse } from "./parser.js";
import { rgbToString } from "./palettes.js";
import { displayStyle, sameStyle, escapeHtml } from "./utils.js";
import { DEFAULT_CSS } from "./styles.js";

/**
 * Converts IRC / ANSI art into an HTML snippet string.
 *
 * @param {string | Array<Array<object>> | object} input - Raw text or parsed grid.
 * @param {object} [options={}] - Render options.
 * @param {boolean} [options.inlineStyles=true] - Whether to include inline CSS styles on spans.
 * @param {boolean} [options.includeCss=false] - Whether to prepend a <style> block.
 * @param {string} [options.className='output-text'] - Class name for outer container.
 * @param {string} [options.rowClassName='output-text-row'] - Class name for row containers.
 * @param {string} [options.runClassName='output-text-run'] - Class name for character runs.
 * @returns {string}
 */
export function toHtml(input, options = {}) {
  const parsed = parse(input, options);
  const defaultForeground = options.defaultForeground ?? [255, 255, 255];
  const defaultBackground = options.defaultBackground ?? [0, 0, 0];

  const className = options.className ?? "output-text";
  const rowClassName = options.rowClassName ?? "output-text-row";
  const runClassName = options.runClassName ?? "output-text-run";

  const fontSize = typeof options.fontSize === "number" ? options.fontSize : 16;
  const fontFamily = options.fontFamily || "monospace";
  const cellAdvance = options.cellAdvance ?? (fontSize * (options.aspectRatio ?? 0.55));
  const lineHeight = options.lineHeight ?? fontSize;

  const containerStyles = [
    `font-size: ${fontSize}px;`,
    `font-family: "${fontFamily.replaceAll('"', '\\"')}", monospace;`,
    `line-height: ${lineHeight}px;`,
    `--output-line-height: ${lineHeight}px;`,
    `width: ${parsed.columns * cellAdvance}px;`,
    `height: ${parsed.rows * lineHeight}px;`,
  ];

  const rowsHtml = [];

  for (const cells of parsed.cells) {
    let currentRunText = "";
    let currentStyle = null;
    let runsHtml = [];

    const flushRun = () => {
      if (currentStyle && currentRunText.length > 0) {
        const styleDeclarations = [
          `color: ${rgbToString(currentStyle.foreground, defaultForeground)};`,
          `background-color: ${rgbToString(currentStyle.background, defaultBackground)};`,
        ];

        if (currentStyle.bold) styleDeclarations.push("font-weight: 700;");
        if (currentStyle.italic) styleDeclarations.push("font-style: italic;");
        if (currentStyle.underline) styleDeclarations.push("text-decoration: underline;");

        const styleAttr = options.inlineStyles !== false
          ? ` style="${styleDeclarations.join(" ")}"`
          : "";

        runsHtml.push(
          `<span class="${escapeHtml(runClassName)}"${styleAttr}>${escapeHtml(currentRunText)}</span>`
        );
        currentRunText = "";
      }
    };

    for (const cell of cells) {
      const style = displayStyle(cell, defaultForeground, defaultBackground);

      if (!currentStyle || !sameStyle(style, currentStyle)) {
        flushRun();
        currentStyle = style;
      }

      currentRunText += cell.character;
    }

    flushRun();

    rowsHtml.push(
      `  <div class="${escapeHtml(rowClassName)}">${runsHtml.join("")}</div>`
    );
  }

  const containerStyleAttr = options.inlineStyles !== false
    ? ` style="${containerStyles.join(" ")}"`
    : "";

  let output = `<div class="${escapeHtml(className)}"${containerStyleAttr} role="img" aria-label="${escapeHtml(options.ariaLabel ?? "Rendered terminal art as native browser text")}">\n${rowsHtml.join("\n")}\n</div>`;

  if (options.includeCss) {
    output = `<style>\n${DEFAULT_CSS}\n</style>\n` + output;
  }

  return output;
}

/**
 * Converts IRC / ANSI art into a standalone HTML5 document.
 *
 * @param {string | Array<Array<object>> | object} input
 * @param {object} [options={}]
 * @param {string} [options.title='Terminal Art']
 * @returns {string}
 */
export function toHtmlDocument(input, options = {}) {
  const title = options.title ?? "Terminal Art";
  const bodyContent = toHtml(input, { ...options, includeCss: false });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <style>
    body {
      margin: 0;
      padding: 24px;
      background: #000;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      box-sizing: border-box;
    }
${DEFAULT_CSS}
  </style>
</head>
<body>
${bodyContent}
</body>
</html>
`;
}
