import assert from "node:assert";
import { calculateMetrics } from "../src/dom-renderer.js";

export function testDomRenderer() {
  console.log("Testing DOM Renderer Metrics...");

  // Metrics calculation
  const metrics = calculateMetrics({
    fontSize: 20,
    fontFamily: "Iosevka",
    aspectRatio: 0.5,
    autoMeasure: false,
  }, 80, 25);

  assert.strictEqual(metrics.fontSize, 20);
  assert.strictEqual(metrics.fontFamily, "Iosevka");
  assert.strictEqual(metrics.cellAdvance, 10);
  assert.strictEqual(metrics.lineHeight, 20);
  assert.strictEqual(metrics.width, 800);
  assert.strictEqual(metrics.height, 500);

  console.log("✓ DOM Renderer tests passed!");
}
