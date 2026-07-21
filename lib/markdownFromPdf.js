// Client-side PDF -> Markdown using pdf.js (pdfjs-dist).
// Runs entirely in the browser: the PDF never leaves the device.

export async function pdfToMarkdown(file, onProgress) {
  if (typeof window === "undefined") return "";

  const pdfjsLib = await import("pdfjs-dist");
  const version = pdfjsLib.version || "4.4.168";
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;

  const buf = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
  const numPages = pdf.numPages;

  let metaTitle = "";
  try {
    const meta = await pdf.getMetadata();
    if (meta && meta.info && meta.info.Title && meta.info.Title.trim()) {
      metaTitle = meta.info.Title.trim();
    }
  } catch (e) {
    /* metadata is optional */
  }

  let bodySize = null;
  let md = "";

  if (metaTitle) {
    md += `# ${metaTitle}\n\n`;
  }

  for (let p = 1; p <= numPages; p++) {
    if (onProgress) onProgress(Math.round(((p - 1) / numPages) * 100), p, numPages);
    const page = await pdf.getPage(p);
    const tc = await page.getTextContent();
    const items = tc.items.filter(
      (it) => typeof it.str === "string" && it.str.trim() !== ""
    );

    if (!items.length) {
      md += `<!-- Page ${p}: no extractable text (scanned or image-only PDF) -->\n\n`;
      if (onProgress) onProgress(Math.round((p / numPages) * 100), p, numPages);
      continue;
    }

    if (bodySize == null) {
      const heights = items
        .map((it) => Math.hypot(it.transform[2], it.transform[3]))
        .sort((a, b) => a - b);
      bodySize = heights[Math.floor(heights.length / 2)] || 12;
    }

    const linesMap = new Map();
    for (const it of items) {
      const y = Math.round(it.transform[5]);
      if (!linesMap.has(y)) linesMap.set(y, []);
      linesMap.get(y).push(it);
    }

    const ys = [...linesMap.keys()].sort((a, b) => b - a); // top of page first
    let pageText = "";

    for (const y of ys) {
      const lineItems = linesMap.get(y).sort((a, b) => a.transform[4] - b.transform[4]);
      const size = Math.hypot(lineItems[0].transform[2], lineItems[0].transform[3]);
      const text = lineItems
        .map((it) => it.str)
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();
      if (!text) continue;

      const ratio = size / bodySize;
      let prefix = "";
      if (ratio >= 1.7 && text.length <= 90) prefix = "# ";
      else if (ratio >= 1.35) prefix = "### ";
      else if (ratio >= 1.18) prefix = "## ";

      const listMatch = text.match(/^([\-\u2022\u25CF\u25A0]|\d+[.)])\s+(.*)$/);
      if (listMatch) {
        const bullet = /^\d/.test(listMatch[1]) ? "1. " : "- ";
        pageText += bullet + listMatch[2].trim() + "\n";
      } else {
        pageText += prefix + text + "\n\n";
      }
    }

    md += `## Page ${p}\n\n${pageText.trim()}\n\n`;
    if (onProgress) onProgress(Math.round((p / numPages) * 100), p, numPages);
  }

  return md.trim() + "\n";
}
