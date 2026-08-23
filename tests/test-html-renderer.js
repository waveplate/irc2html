import assert from "node:assert";
import { toHtml, toHtmlDocument } from "../src/html-renderer.js";

export function testHtmlRenderer() {
  console.log("Testing HTML Renderer...");

  // 1. Basic HTML string output
  const html = toHtml("\x0304Red\x0303Green");
  assert.ok(html.includes("class=\"irc2html-output\""), "Container should have output class");
  assert.ok(html.includes("class=\"irc2html-row\""), "Should contain row element");
  assert.ok(html.includes("class=\"irc2html-run\""), "Should contain run element");
  assert.ok(html.includes("color: rgb(255 0 0);"), "Should have red color style");
  assert.ok(html.includes("color: rgb(0 147 0);"), "Should have green color style");

  // 2. Style coalescing: 'Red' is 3 characters with same style -> should produce ONE <span>Red</span>
  assert.ok(html.includes(">Red</span>"), "Adjacent same-styled cells must be coalesced into single span");
  assert.ok(html.includes(">Green</span>"), "Adjacent same-styled cells must be coalesced into single span");

  // 3. HTML Escaping
  const rawWithSpecialChars = '<script>alert("xss")</script> & " \'';
  const escapedHtml = toHtml(rawWithSpecialChars);
  assert.ok(!escapedHtml.includes("<script>"), "Must escape <script>");
  assert.ok(escapedHtml.includes("&lt;script&gt;"), "Must contain &lt;script&gt;");
  assert.ok(escapedHtml.includes("&amp;"), "Must contain &amp;");
  assert.ok(escapedHtml.includes("&quot;"), "Must contain &quot;");
  assert.ok(escapedHtml.includes("&#39;"), "Must contain &#39;");

  // 4. Standalone Document
  const doc = toHtmlDocument("\x0304TitleArt", { title: "Custom Title" });
  assert.ok(doc.startsWith("<!DOCTYPE html>"), "Should start with doctype");
  assert.ok(doc.includes("<title>Custom Title</title>"), "Should include title");
  assert.ok(doc.includes(".irc2html-output"), "Should include embedded CSS");

  console.log("✓ HTML Renderer tests passed!");
}
