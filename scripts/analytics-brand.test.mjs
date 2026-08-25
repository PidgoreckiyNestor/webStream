import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import zlib from "node:zlib";
import ts from "typescript";

function objectLiteralValue(node) {
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isStringLiteral(node)) return node.text;
  if (!ts.isObjectLiteralExpression(node)) return undefined;

  return Object.fromEntries(
    node.properties.flatMap((property) => {
      if (!ts.isPropertyAssignment(property)) return [];
      const name = property.name.getText().replaceAll(/["']/g, "");
      return [[name, objectLiteralValue(property.initializer)]];
    }),
  );
}

function loadPostHogConfig() {
  const source = fs.readFileSync("src/components/mv/PostHogProvider.tsx", "utf8");
  const tree = ts.createSourceFile(
    "PostHogProvider.tsx",
    source,
    ts.ScriptTarget.ESNext,
    true,
    ts.ScriptKind.TSX,
  );
  let config;

  function visit(node) {
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.text === "init" &&
      node.arguments.length >= 2
    ) {
      config = objectLiteralValue(node.arguments[1]);
    }
    ts.forEachChild(node, visit);
  }

  visit(tree);
  assert.ok(config, "PostHog init configuration was not found");
  return config;
}

function paeth(left, above, upperLeft) {
  const estimate = left + above - upperLeft;
  const leftDistance = Math.abs(estimate - left);
  const aboveDistance = Math.abs(estimate - above);
  const upperLeftDistance = Math.abs(estimate - upperLeft);
  if (leftDistance <= aboveDistance && leftDistance <= upperLeftDistance) return left;
  return aboveDistance <= upperLeftDistance ? above : upperLeft;
}

function decodeRgbaPng(png) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  assert.deepEqual(png.subarray(0, 8), signature, "favicon frame must be PNG encoded");

  let offset = 8;
  let width;
  let height;
  const compressed = [];
  while (offset < png.length) {
    const length = png.readUInt32BE(offset);
    const type = png.toString("ascii", offset + 4, offset + 8);
    const data = png.subarray(offset + 8, offset + 8 + length);
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      assert.equal(data[8], 8, "favicon PNG must use 8-bit channels");
      assert.equal(data[9], 6, "favicon PNG must use RGBA color");
      assert.equal(data[12], 0, "favicon PNG must not be interlaced");
    } else if (type === "IDAT") {
      compressed.push(data);
    } else if (type === "IEND") {
      break;
    }
    offset += length + 12;
  }

  assert.ok(width && height);
  const bytesPerPixel = 4;
  const rowLength = width * bytesPerPixel;
  const filtered = zlib.inflateSync(Buffer.concat(compressed));
  const pixels = Buffer.alloc(rowLength * height);
  let inputOffset = 0;

  for (let y = 0; y < height; y += 1) {
    const filter = filtered[inputOffset];
    inputOffset += 1;
    for (let x = 0; x < rowLength; x += 1) {
      const raw = filtered[inputOffset + x];
      const outputIndex = y * rowLength + x;
      const left = x >= bytesPerPixel ? pixels[outputIndex - bytesPerPixel] : 0;
      const above = y > 0 ? pixels[outputIndex - rowLength] : 0;
      const upperLeft = y > 0 && x >= bytesPerPixel
        ? pixels[outputIndex - rowLength - bytesPerPixel]
        : 0;
      const predictor = [0, left, above, Math.floor((left + above) / 2), paeth(left, above, upperLeft)][filter];
      assert.notEqual(predictor, undefined, `unsupported PNG filter ${filter}`);
      pixels[outputIndex] = (raw + predictor) & 0xff;
    }
    inputOffset += rowLength;
  }

  return { width, height, pixels };
}

function decodeRgbaBitmap(bitmap) {
  assert.equal(bitmap.readUInt32LE(0), 40, "favicon bitmap must use BITMAPINFOHEADER");
  const width = bitmap.readInt32LE(4);
  const height = bitmap.readInt32LE(8) / 2;
  assert.equal(bitmap.readUInt16LE(14), 32, "favicon bitmap must use 32-bit BGRA");
  const pixels = Buffer.alloc(width * height * 4);
  const sourceOffset = 40;

  for (let y = 0; y < height; y += 1) {
    const sourceY = height - y - 1;
    for (let x = 0; x < width; x += 1) {
      const source = sourceOffset + (sourceY * width + x) * 4;
      const target = (y * width + x) * 4;
      pixels[target] = bitmap[source + 2];
      pixels[target + 1] = bitmap[source + 1];
      pixels[target + 2] = bitmap[source];
      pixels[target + 3] = bitmap[source + 3];
    }
  }

  return { width, height, pixels };
}

function decodeIcoFrame(frame) {
  const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return frame.subarray(0, 8).equals(pngSignature)
    ? decodeRgbaPng(frame)
    : decodeRgbaBitmap(frame);
}

function loadIcoFrame(path, targetSize) {
  const ico = fs.readFileSync(path);
  const count = ico.readUInt16LE(4);
  for (let index = 0; index < count; index += 1) {
    const entry = 6 + index * 16;
    const width = ico[entry] || 256;
    const height = ico[entry + 1] || 256;
    if (width !== targetSize || height !== targetSize) continue;
    const length = ico.readUInt32LE(entry + 8);
    const offset = ico.readUInt32LE(entry + 12);
    return ico.subarray(offset, offset + length);
  }
  assert.fail(`favicon.ico has no ${targetSize}x${targetSize} frame`);
}

test("allows project-side Session Replay while explicitly masking form inputs", () => {
  const config = loadPostHogConfig();

  assert.notEqual(config.disable_session_recording, true);
  assert.deepEqual(config.session_recording, {
    maskAllInputs: true,
    recordHeaders: false,
    recordBody: false,
  });
  assert.equal(config.respect_dnt, true);
});

test("keeps the MindVault mark readable in the browser's 16px favicon slot", () => {
  const frame = decodeIcoFrame(loadIcoFrame("src/app/favicon.ico", 16));
  assert.equal(frame.width, 16);
  assert.equal(frame.height, 16);

  let highContrastPixels = 0;
  for (let index = 0; index < frame.pixels.length; index += 4) {
    const [red, green, blue, alpha] = frame.pixels.subarray(index, index + 4);
    if (alpha >= 220 && red >= 190 && green >= 190 && blue >= 190) {
      highContrastPixels += 1;
    }
  }

  assert.ok(
    highContrastPixels >= 28,
    `16px favicon has only ${highContrastPixels} high-contrast mark pixels`,
  );
});
