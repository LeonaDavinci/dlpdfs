"use client";

import { useRef, useState } from "react";
import { pdfToMarkdown } from "@/lib/markdownFromPdf";

function htmlToMd(html) {
  let s = String(html);
  s = s.replace(/<script[\s\S]*?<\/script>/gi, "");
  s = s.replace(/<style[\s\S]*?<\/style>/gi, "");
  s = s.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "# $1\n\n");
  s = s.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "## $1\n\n");
  s = s.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "### $1\n\n");
  s = s.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "#### $1\n\n");
  s = s.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n");
  s = s.replace(/<ul[^>]*>|<\/ul>|<ol[^>]*>|<\/ol>/gi, "\n");
  s = s.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, "**$2**");
  s = s.replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, "*$2*");
  s = s.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)");
  s = s.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "$1\n\n");
  s = s.replace(/<br\s*\/?>/gi, "\n");
  s = s.replace(/<[^>]+>/g, "");
  s = s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  s = s.replace(/&nbsp;/g, " ");
  s = s.replace(/\n{3,}/g, "\n\n");
  return s.trim() + "\n";
}

export default function ConverterWidget({ defaultMode = "pdf" }) {
  const [mode, setMode] = useState(defaultMode);
  const [over, setOver] = useState(false);
  const [file, setFile] = useState(null);
  const [html, setHtml] = useState("");
  const [progress, setProgress] = useState(0);
  const [pageInfo, setPageInfo] = useState("");
  const [status, setStatus] = useState("idle");
  const [resultName, setResultName] = useState("");
  const [resultMd, setResultMd] = useState("");
  const [err, setErr] = useState("");
  const inputRef = useRef(null);

  function pickFile(e) {
    const f = e.target.files && e.target.files[0];
    if (f) {
      setFile(f);
      setStatus("idle");
      setErr("");
    }
  }

  function onDrop(e) {
    e.preventDefault();
    setOver(false);
    const f = e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) {
      setFile(f);
      setStatus("idle");
      setErr("");
    }
  }

  function download(name, content) {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function convert() {
    if (mode === "html") {
      if (!html.trim()) return;
      const md = htmlToMd(html);
      setResultName("converted.html.md");
      setResultMd(md);
      setStatus("done");
      return;
    }
    if (!file) return;
    setStatus("working");
    setProgress(0);
    setPageInfo("Reading PDF…");
    setErr("");
    const name = file.name.replace(/\.pdf$/i, "") + ".md";
    try {
      const md = await pdfToMarkdown(file, (pct, p, n) => {
        setProgress(pct);
        setPageInfo(`Converting page ${p} of ${n}…`);
      });
      if (!md || md.trim().length < 5) {
        throw new Error(
          "No text could be extracted. The PDF looks scanned or image-only — try OCR first."
        );
      }
      setResultMd(md);
      setResultName(name);
      setStatus("done");
      setPageInfo("");
    } catch (e) {
      setStatus("error");
      setErr(e && e.message ? e.message : "Conversion failed. Please try another PDF.");
      setPageInfo("");
    }
  }

  function downloadResult() {
    if (!resultMd) return;
    download(resultName, resultMd);
  }

  function reset() {
    setStatus("idle");
    setProgress(0);
    setPageInfo("");
    setResultMd("");
    setResultName("");
    setErr("");
    setFile(null);
  }

  return (
    <div className="widget" id="convert">
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <button
          className={"chip" + (mode === "pdf" ? " active" : "")}
          onClick={() => {
            setMode("pdf");
            reset();
          }}
        >
          PDF to Markdown
        </button>
        <button
          className={"chip" + (mode === "html" ? " active" : "")}
          onClick={() => {
            setMode("html");
            reset();
          }}
        >
          HTML to MD
        </button>
      </div>

      {mode === "pdf" ? (
        <>
          <div
            className={"drop" + (over ? " over" : "")}
            onClick={() => inputRef.current && inputRef.current.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setOver(true);
            }}
            onDragLeave={() => setOver(false)}
            onDrop={onDrop}
          >
            <div className="big">Drop your PDF here</div>
            <div className="small">
              or click to select a file — converts to Markdown in your browser
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              onChange={pickFile}
              style={{ display: "none" }}
            />
          </div>
          <div className="arrow">PDF &darr; Markdown</div>
          {file && (
            <div className="fileline">
              Selected: <b>{file.name}</b> ({(file.size / 1024).toFixed(0)} KB)
            </div>
          )}
        </>
      ) : (
        <>
          <div className="small" style={{ marginBottom: 8 }}>
            Paste HTML and convert it to Markdown instantly (runs in your browser).
          </div>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            placeholder={
              "<h1>Hello</h1>\n<p>Some <b>bold</b> text and a <a href='https://example.com'>link</a>.</p>"
            }
            style={{
              width: "100%",
              minHeight: 120,
              borderRadius: 10,
              border: "1px solid #cbd5e1",
              padding: 12,
              fontFamily: "monospace",
              fontSize: 13,
            }}
          />
          <div className="arrow">HTML &darr; Markdown</div>
        </>
      )}

      {status === "working" && (
        <div className="progress">
          <span style={{ width: progress + "%" }} />
        </div>
      )}
      {status === "working" && pageInfo && (
        <div className="fileline">{pageInfo}</div>
      )}
      {status === "error" && (
        <div className="fileline" style={{ color: "#b91c1c", borderColor: "#fca5a5" }}>
          {err}
        </div>
      )}

      <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
        {status !== "done" && status !== "working" && (
          <button
            className="btn btn-primary"
            onClick={convert}
            disabled={mode === "pdf" && !file}
          >
            Convert to Markdown
          </button>
        )}
        {status === "working" && (
          <button className="btn btn-primary" disabled>
            Converting… {progress}%
          </button>
        )}
        {status === "done" && (
          <>
            <button className="btn btn-accent" onClick={downloadResult}>
              Download .md
            </button>
            <button className="btn btn-ghost" onClick={reset}>
              Convert another
            </button>
          </>
        )}
        {status === "error" && (
          <button className="btn btn-primary" onClick={convert}>
            Try again
          </button>
        )}
      </div>

      {status === "done" && mode === "pdf" && (
        <div className="fileline">
          Done. Your real PDF text was converted to Markdown — click{" "}
          <b>Download .md</b> to save it. Nothing was uploaded.
        </div>
      )}
    </div>
  );
}
