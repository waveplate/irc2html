import { IrcViewer, toHtml, toHtmlDocument } from "../src/index.js";

const sampleSelect = document.getElementById("sample-select");
const formatSelect = document.getElementById("format-select");
const fontSizeInput = document.getElementById("font-size");
const fontSizeVal = document.getElementById("font-size-val");
const fontFamilySelect = document.getElementById("font-family");
const lineHeightInput = document.getElementById("line-height");
const lineHeightVal = document.getElementById("line-height-val");
const aspectRatioInput = document.getElementById("aspect-ratio");
const aspectRatioVal = document.getElementById("aspect-ratio-val");
const rawTextInput = document.getElementById("raw-text-input");
const fileInput = document.getElementById("file-input");

const stageEl = document.getElementById("art-stage");
const statusDim = document.getElementById("status-dim");
const statusCells = document.getElementById("status-cells");
const statusTime = document.getElementById("status-time");
const statusHover = document.getElementById("status-hover");

const tabDomBtn = document.getElementById("tab-dom-btn");
const tabHtmlBtn = document.getElementById("tab-html-btn");
const domViewport = document.getElementById("dom-viewport");
const htmlViewport = document.getElementById("html-viewport");
const htmlCodeArea = document.getElementById("html-code-area");

const copyHtmlBtn = document.getElementById("copy-html-btn");
const copyTextBtn = document.getElementById("copy-text-btn");
const downloadHtmlBtn = document.getElementById("download-html-btn");

let viewer = null;
let currentArt = "";

const SAMPLES = {
  "biglisa": "./samples/biglisa.ansi",
  "2cool4skin": "./samples/2cool4skin.irc",
  "badge": "./samples/badge.irc",
  "ansitest": "./samples/ansitest.ansi",
  "palette-test": "./samples/palette-test.irc",
  "truecolor-rainbow": "./samples/truecolor-rainbow.ansi",
};

async function loadSample(name) {
  const url = SAMPLES[name];
  if (!url) return;
  try {
    const res = await fetch(url);
    const text = await res.text();
    rawTextInput.value = text;
    renderArt(text);
  } catch (err) {
    console.error("Failed to load sample:", err);
  }
}

function renderArt(text) {
  currentArt = text;
  const startTime = performance.now();

  const options = {
    fontSize: parseFloat(fontSizeInput.value),
    fontFamily: fontFamilySelect.value,
    lineHeight: parseFloat(fontSizeInput.value) * parseFloat(lineHeightInput.value),
    aspectRatio: parseFloat(aspectRatioInput.value),
    format: formatSelect.value,
  };

  if (!viewer) {
    viewer = new IrcViewer(stageEl, options);
  } else {
    viewer.setOptions(options);
  }

  viewer.setArt(text, options);
  const elapsed = performance.now() - startTime;

  const dims = viewer.getDimensions();
  statusDim.textContent = `${dims.columns} × ${dims.rows}`;
  statusCells.textContent = (dims.columns * dims.rows).toLocaleString();
  statusTime.textContent = `${elapsed.toFixed(1)} ms`;

  // Update HTML view if active
  if (htmlViewport.classList.contains("active")) {
    htmlCodeArea.value = toHtml(text, options);
  }
}

// Event Listeners
sampleSelect.addEventListener("change", () => {
  loadSample(sampleSelect.value);
});

formatSelect.addEventListener("change", () => {
  renderArt(rawTextInput.value);
});

fontSizeInput.addEventListener("input", () => {
  const size = fontSizeInput.value;
  fontSizeVal.textContent = `${size}px`;
  if (viewer) {
    viewer.setFontSize(parseFloat(size));
    viewer.setOptions({
      lineHeight: parseFloat(size) * parseFloat(lineHeightInput.value),
      aspectRatio: parseFloat(aspectRatioInput.value),
    });
  }
});

fontFamilySelect.addEventListener("change", () => {
  if (viewer) {
    viewer.setFontFamily(fontFamilySelect.value);
  }
});

lineHeightInput.addEventListener("input", () => {
  lineHeightVal.textContent = `${lineHeightInput.value}x`;
  if (viewer) {
    const size = parseFloat(fontSizeInput.value);
    viewer.setOptions({
      lineHeight: size * parseFloat(lineHeightInput.value),
    });
  }
});

aspectRatioInput.addEventListener("input", () => {
  aspectRatioVal.textContent = aspectRatioInput.value;
  if (viewer) {
    viewer.setOptions({
      aspectRatio: parseFloat(aspectRatioInput.value),
    });
  }
});

rawTextInput.addEventListener("input", () => {
  renderArt(rawTextInput.value);
});

// File Upload & Drag-and-drop
fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (evt) => {
      rawTextInput.value = evt.target.result;
      renderArt(evt.target.result);
    };
    reader.readAsText(file);
  }
});

window.addEventListener("dragover", (e) => e.preventDefault());
window.addEventListener("drop", (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (evt) => {
      rawTextInput.value = evt.target.result;
      renderArt(evt.target.result);
    };
    reader.readAsText(file);
  }
});

// Theme switcher
document.querySelectorAll(".theme-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".theme-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const theme = btn.dataset.theme;
    if (viewer) {
      viewer.setTheme(theme);
    }
  });
});

// Hover inspection
stageEl.addEventListener("mousemove", (e) => {
  if (!viewer) return;
  const point = viewer.clientPointToCell(e.clientX, e.clientY);
  if (point) {
    const char = point.cell?.character === " " ? "␣" : point.cell?.character;
    const fg = point.cell?.foreground ? `rgb(${point.cell.foreground.join(",")})` : "default";
    const bg = point.cell?.background ? `rgb(${point.cell.background.join(",")})` : "none";
    statusHover.textContent = `Cell (${point.x}, ${point.y}) · Char: '${char}' · FG: ${fg} · BG: ${bg}`;
  } else {
    statusHover.textContent = "-";
  }
});

// Tabs
tabDomBtn.addEventListener("click", () => {
  tabDomBtn.classList.add("active");
  tabHtmlBtn.classList.remove("active");
  domViewport.style.display = "flex";
  htmlViewport.classList.remove("active");
});

tabHtmlBtn.addEventListener("click", () => {
  tabHtmlBtn.classList.add("active");
  tabDomBtn.classList.remove("active");
  domViewport.style.display = "none";
  htmlViewport.classList.add("active");
  const options = {
    fontSize: parseFloat(fontSizeInput.value),
    fontFamily: fontFamilySelect.value,
    lineHeight: parseFloat(fontSizeInput.value) * parseFloat(lineHeightInput.value),
    aspectRatio: parseFloat(aspectRatioInput.value),
  };
  htmlCodeArea.value = toHtml(currentArt, options);
});

// Copy & Download
copyHtmlBtn.addEventListener("click", async () => {
  const options = {
    fontSize: parseFloat(fontSizeInput.value),
    fontFamily: fontFamilySelect.value,
  };
  const html = toHtml(currentArt, options);
  await navigator.clipboard.writeText(html);
  copyHtmlBtn.textContent = "✓ Copied!";
  setTimeout(() => (copyHtmlBtn.textContent = "Copy HTML"), 2000);
});

copyTextBtn.addEventListener("click", async () => {
  if (viewer) {
    await viewer.copyText();
    copyTextBtn.textContent = "✓ Copied!";
    setTimeout(() => (copyTextBtn.textContent = "Copy Text"), 2000);
  }
});

downloadHtmlBtn.addEventListener("click", () => {
  const options = {
    fontSize: parseFloat(fontSizeInput.value),
    fontFamily: fontFamilySelect.value,
    title: "Rendered IRC / ANSI Art",
  };
  const fullHtml = toHtmlDocument(currentArt, options);
  const blob = new Blob([fullHtml], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "rendered-art.html";
  a.click();
  URL.revokeObjectURL(url);
});

// Initial Load
loadSample("biglisa");
