import { testPalettes } from "./test-palettes.js";
import { testIrcParser } from "./test-irc-parser.js";
import { testAnsiParser } from "./test-ansi-parser.js";
import { testHtmlRenderer } from "./test-html-renderer.js";
import { testDomRenderer } from "./test-dom-renderer.js";

console.log("========================================");
console.log("Running irc2html test suite...");
console.log("========================================");

try {
  testPalettes();
  testIrcParser();
  testAnsiParser();
  testHtmlRenderer();
  testDomRenderer();
  console.log("========================================");
  console.log("🎉 All tests passed successfully!");
  console.log("========================================");
} catch (err) {
  console.error("❌ Test failed:", err);
  process.exit(1);
}
