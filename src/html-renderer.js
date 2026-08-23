import { parse } from "./parser.js";
import { rgbToString } from "./palettes.js";
import { displayStyle, sameStyle, escapeHtml } from "./utils.js";
import { calculateMetrics } from "./dom-renderer.js";
import { DEFAULT_CSS } from "./styles.js";

/**
 * Converts IRC / ANSI art into an HTML snippet string.
 *
 * @param {string | Array<Array<object>> | object} input - Raw text or parsed grid.
 * @param {object} [options={}] - Render options.
 * @param {boolean} [options.inlineStyles=true] - Whether to include inline CSS styles on spans.
 * @param {boolean} [options.includeCss=false] - Whether to prepend a <style> block.
 * @param {string} [options.className='irc2html-output'] - Class name for outer container.
 * @param {string} [options.rowClassName='irc2html-row'] - Class name for row containers.
 * @param {string} [options.runClassName='irc2html-run'] - Class name for character runs.
 * @returns {string}
 */
export function toHtml(input, options = {}) {
  const parsed = parse(input, options);
  const defaultForeground = options.defaultForeground ?? [255, 255, 255];
  const defaultBackground = options.defaultBackground ?? [0, 0, 0];

  const className = options.className ?? "irc2html-output";
  const rowClassName = options.rowClassName ?? "irc2html-row";
  const runClassName = options.runClassName ?? "irc2html-run";

  const metrics = calculateMetrics(options, parsed.columns, parsed.rows);

  const containerStyles = [
    `--irc2html-font-size: ${metrics.fontSize}px;`,
    `--irc2html-font-family: "${metrics.fontFamily.replaceAll('"', '\\"')}", monospace;`,
    `--irc2html-line-height: ${metrics.lineHeight}px;`,
    `--irc2html-letter-spacing: ${metrics.letterSpacing};`,
    `font-size: ${metrics.fontSize}px;`,
    `font-family: "${metrics.fontFamily.replaceAll('"', '\\"')}", monospace;`,
    `line-height: ${metrics.lineHeight}px;`,
    `letter-spacing: ${metrics.letterSpacing};`,
  ];

  if (metrics.width) {
    containerStyles.push(`width: ${metrics.width}px;`);
  }
  if (metrics.height) {
    containerStyles.push(`height: ${metrics.height}px;`);
  }
  if (options.theme === "light") {
    containerStyles.push("--irc2html-bg: #ffffff; --irc2html-fg: #000000;");
  } else if (options.theme === "transparent") {
    containerStyles.push("--irc2html-bg: transparent;");
  }

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
        if (currentStyle.strikethrough) styleDeclarations.push("text-decoration: line-through;");
        if (currentStyle.hidden) styleDeclarations.push("visibility: hidden;");

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

  let output = `<div class="${escapeHtml(className)}"${containerStyleAttr} role="img" aria-label="${escapeHtml(options.ariaLabel ?? "Rendered terminal art")}">\n${rowsHtml.join("\n")}\n</div>`;

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
 * @param {string} [options.title='IRC Art']
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
      background: #111;
      color: #eee;
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
