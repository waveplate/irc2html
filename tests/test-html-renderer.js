import assert from "node:assert";
import { toHtml, toHtmlDocument } from "../src/html-renderer.js";
import { DEFAULT_CSS } from "../src/styles.js";

export function testHtmlRenderer() {
  console.log("Testing HTML Renderer...");

  // 1. Basic HTML string output
  const html = toHtml("\x0304Red\x0303Green");
  assert.ok(html.includes("class=\"output-text\""), "Container should have output-text class");
  assert.ok(html.includes("class=\"output-text-row\""), "Should contain output-text-row element");
  assert.ok(html.includes("class=\"output-text-run\""), "Should contain output-text-run element");
  assert.ok(html.includes("color: rgb(255 0 0);"), "Should have red color style");
  assert.ok(html.includes("color: rgb(0 147 0);"), "Should have green color style");

  // 2. Styles are still coalesced into runs, while each character gets one
  // fixed-width clipping box so a wide/fallback glyph cannot shift its peers.
  assert.strictEqual(
    (html.match(/class="output-text-run"/g) ?? []).length,
    2,
    "Adjacent same-styled cells must share a run",
  );
  assert.strictEqual(
    (html.match(/class="output-text-cell"/g) ?? []).length,
    8,
    "Every printable character must get exactly one cell wrapper",
  );

  // 3. HTML Escaping
  const rawWithSpecialChars = '<script>alert("xss")</script> & " \'';
  const escapedHtml = toHtml(rawWithSpecialChars);
  assert.ok(!escapedHtml.includes("<script>"), "Must escape <script>");
  assert.ok(escapedHtml.includes("&lt;"), "Must escape opening angle brackets");
  assert.ok(escapedHtml.includes("&gt;"), "Must escape closing angle brackets");
  assert.ok(escapedHtml.includes("&amp;"), "Must contain &amp;");
  assert.ok(escapedHtml.includes("&quot;"), "Must contain &quot;");
  assert.ok(escapedHtml.includes("&#39;"), "Must contain &#39;");

  // 4. Standalone Document
  const doc = toHtmlDocument("\x0304TitleArt", { title: "Custom Title" });
  assert.ok(doc.startsWith("<!DOCTYPE html>"), "Should start with doctype");
  assert.ok(doc.includes("<title>Custom Title</title>"), "Should include title");
  assert.ok(doc.includes(".output-text"), "Should include embedded CSS");

  // 5. Unicode display width is never allowed to alter grid geometry. The
  // parser deliberately treats each code point as one cell; painting is then
  // clipped by the renderer even for wide, combining, and fallback glyphs.
  const unicode = toHtml("A界\u0301💥B", { cellAdvance: 8 });
  assert.ok(unicode.includes("--output-cell-advance: 8px;"));
  assert.ok(unicode.includes("width: 40px;"));
  assert.strictEqual((unicode.match(/class="output-text-cell"/g) ?? []).length, 5);
  assert.match(DEFAULT_CSS, /\.output-text-cell[\s\S]*overflow: hidden;/);
  assert.match(DEFAULT_CSS, /flex: 0 0 var\(--output-cell-advance/);

  console.log("✓ HTML Renderer tests passed!");
}
