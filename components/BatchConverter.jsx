"use client";

import { useRef, useState } from "react";
import JSZip from "jszip";
import { pdfToMarkdown } from "@/lib/markdownFromPdf";

export default function BatchConverter() {
  const [files, setFiles] = useState([]);
  const [over, setOver] = useState(false);
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(0);
  const [log, setLog] = useState([]);
  const [zipUrl, setZipUrl] = useState("");
  const [zipName, setZipName] = useState("");
  const inputRef = useRef(null);

  function pick(e) {
    const list = Array.from(e.target.files || []).filter(
      (f) => f.type === "application/pdf" || /\.pdf$/i.test(f.name)
    );
    setFiles(list);
    setLog([]);
    setStatus("idle");
    setProgress(0);
    setDone(0);
    setZipUrl("");
  }

  function onDrop(e) {
    e.preventDefault();
    setOver(false);
    const list = Array.from(e.dataTransfer.files || []).filter(
      (f) => f.type === "application/pdf" || /\.pdf$/i.test(f.name)
    );
    setFiles(list);
    setLog([]);
    setStatus("idle");
  }

  function downloadZip(url, name) {
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async function run() {
    if (!files.length) return;
    setStatus("working");
    setProgress(0);
    setDone(0);
    setLog([]);
    setZipUrl("");

    const results = [];
    const n = files.length;
    for (let i = 0; i < n; i++) {
      const f = files[i];
      setLog((l) => [...l, `Converting ${f.name}…`]);
      try {
        const md = await pdfToMarkdown(f, () => {});
        const base = f.name.replace(/\.pdf$/i, "");
        results.push({ name: base, md });
        setLog((l) => [...l, `✓ ${f.name} → ${base}.md`]);
      } catch (e) {
        setLog((l) => [...l, `✗ ${f.name}: ${e && e.message ? e.message : "failed"}`]);
      }
      setDone(i + 1);
      setProgress(Math.round(((i + 1) / n) * 100));
    }

    if (results.length) {
      const zip = new JSZip();
      for (const r of results) zip.file(`${r.name}.md`, r.md);
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      setZipUrl(url);
      setZipName("pdfs-as-markdown.zip");
      setLog((l) => [...l, `Built pdfs-as-markdown.zip (${results.length} files).`]);
    }
    setStatus("done");
  }

  return (
    <div className="widget">
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
        <div className="big">Drop several PDFs here</div>
        <div className="small">
          or click to select multiple files — converts each to Markdown
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          multiple
          onChange={pick}
          style={{ display: "none" }}
        />
      </div>

      {files.length > 0 && (
        <div className="fileline">
          {files.length} PDF{files.length > 1 ? "s" : ""} selected ·{" "}
          {(files.reduce((s, f) => s + f.size, 0) / 1024 / 1024).toFixed(1)} MB
          total
        </div>
      )}

      {status === "working" && (
        <div className="progress">
          <span style={{ width: progress + "%" }} />
        </div>
      )}
      {status === "working" && (
        <div className="fileline">
          Converting batch… {done}/{files.length} ({progress}%)
        </div>
      )}

      <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
        {status !== "working" && status !== "done" && (
          <button
            className="btn btn-primary"
            onClick={run}
            disabled={!files.length}
          >
            Convert &amp; download ZIP
          </button>
        )}
        {status === "working" && (
          <button className="btn btn-primary" disabled>
            Working… {progress}%
          </button>
        )}
        {status === "done" && zipUrl && (
          <>
            <a className="btn btn-accent" href={zipUrl} download={zipName}>
              Download your PDFs (.zip)
            </a>
            <button
              className="btn btn-ghost"
              onClick={() => {
                setFiles([]);
                setStatus("idle");
                setLog([]);
                setZipUrl("");
                setProgress(0);
              }}
            >
              Start over
            </button>
          </>
        )}
      </div>

      {log.length > 0 && (
        <ul className="batch-log">
          {log.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
