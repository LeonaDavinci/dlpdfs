export const metadata = {
  title: "PDF to Markdown API — Convert PDF to Markdown Programmatically",
  description:
    "The PDF to Markdown API lets you convert PDF to Markdown from any script, cron job or RAG pipeline. Get clean Markdown with headings, lists and tables — same engine as the browser tool. Free tier and batch PDFs download supported.",
  keywords: [
    "pdf to markdown api",
    "pdf to markdown api online",
    "convert pdf to markdown api",
    "pdf markdown api",
    "pdf to md api",
    "pdf to markdown programmatically",
    "batch pdf to markdown",
  ],
  alternates: { canonical: "/pdf-to-markdown-api" },
};

const CURL = `curl -X POST https://www.dlpdfs.com/api/v1/pdf-to-markdown \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@report.pdf" \\
  -F "headings=true" \\
  -o report.md`;

const PY = `import requests

with open("report.pdf", "rb") as f:
    r = requests.post(
        "https://www.dlpdfs.com/api/v1/pdf-to-markdown",
        headers={"Authorization": "Bearer YOUR_API_KEY"},
        files={"file": f},
        data={"headings": "true"},
    )
r.raise_for_status()
with open("report.md", "w", encoding="utf-8") as out:
    out.write(r.text)`;

const NODE = `import fs from "fs";

const res = await fetch("https://www.dlpdfs.com/api/v1/pdf-to-markdown", {
  method: "POST",
  headers: { Authorization: "Bearer YOUR_API_KEY" },
  body: (() => {
    const fd = new FormData();
    fd.append("file", fs.createReadStream("report.pdf"));
    return fd;
  })(),
});
const md = await res.text();
fs.writeFileSync("report.md", md);`;

export default function ApiPage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>PDF to Markdown API</h1>
            <p className="lede">
              Convert <b>PDF to Markdown</b> from any script, cron job or RAG
              pipeline. Send a PDF and get clean Markdown back — the same engine
              that powers the <a href="/">PDF to Markdown</a> browser tool, so
              headings, lists and structure survive. Also works for{" "}
              <a href="/batch-pdf-to-markdown">batch PDF to Markdown</a> and bulk{" "}
              <b>download your PDFs as Markdown</b>.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="/">
                Try the converter first
              </a>
              <a className="btn btn-ghost" href="/batch-pdf-to-markdown">
                Batch PDF to Markdown
              </a>
            </div>
            <p className="trust">
              REST · JSON + Markdown · free tier · same engine as the browser tool
            </p>
          </div>
          <div className="widget">
            <div className="small" style={{ marginBottom: 8 }}>
              Endpoint
            </div>
            <pre className="code">
              <code>POST /api/v1/pdf-to-markdown</code>
            </pre>
            <div className="small" style={{ margin: "10px 0 6px" }}>
              Returns Markdown text (Content-Type: text/markdown).
            </div>
          </div>
        </div>
      </section>

      <section className="block" id="how">
        <div className="container">
          <div className="section-head">
            <h2>How the PDF to Markdown API works</h2>
            <p>
              Three steps from a PDF on disk to Markdown in your codebase — ideal
              for automation, RAG and documentation pipelines.
            </p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="num">1</div>
              <h3>Get an API key</h3>
              <p>
                Create a key from your dashboard. The free tier of the PDF to
                Markdown API covers everyday scripts and prototypes.
              </p>
            </div>
            <div className="step">
              <div className="num">2</div>
              <h3>POST your PDF</h3>
              <p>
                Send the file as multipart form data with your key. The API reads
                the text layer and rebuilds the document as Markdown.
              </p>
            </div>
            <div className="step">
              <div className="num">3</div>
              <h3>Use the Markdown</h3>
              <p>
                Write the response to disk, pipe it into a vector store, or commit
                it to Git. For many files, loop the call or use batch PDF to
                Markdown.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="block" style={{ background: "#fff" }}>
        <div className="container">
          <div className="section-head">
            <h2>PDF to Markdown API examples</h2>
            <p>
              Copy a snippet and start converting PDF to Markdown programmatically
              in seconds.
            </p>
          </div>

          <h3 style={{ marginTop: 8 }}>cURL</h3>
          <pre className="code wide">
            <code>{CURL}</code>
          </pre>

          <h3 style={{ marginTop: 22 }}>Python</h3>
          <pre className="code wide">
            <code>{PY}</code>
          </pre>

          <h3 style={{ marginTop: 22 }}>Node.js</h3>
          <pre className="code wide">
            <code>{NODE}</code>
          </pre>
        </div>
      </section>

      <section className="block">
        <div className="container" style={{ maxWidth: 820 }}>
          <h2 style={{ fontSize: 28 }}>Parameters</h2>
          <div className="table-wrap">
            <table className="doc-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>file</td>
                  <td>file (required)</td>
                  <td>The PDF to convert to Markdown. Native digital PDFs give the cleanest output.</td>
                </tr>
                <tr>
                  <td>headings</td>
                  <td>bool</td>
                  <td>Preserve H1–H3 as Markdown headings (default true).</td>
                </tr>
                <tr>
                  <td>lists</td>
                  <td>bool</td>
                  <td>Convert bullet and numbered lists to Markdown (default true).</td>
                </tr>
                <tr>
                  <td>page_breaks</td>
                  <td>bool</td>
                  <td>Insert a Markdown comment between pages (default true).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 style={{ fontSize: 28, marginTop: 28 }}>Limits & rate limits</h2>
          <p>
            The free tier of the PDF to Markdown API allows a generous number of
            conversions per day and files up to a standard document size. Paid
            plans raise both the rate limit and the file cap, and unlock{" "}
            <a href="/batch-pdf-to-markdown">batch PDF to Markdown</a> for bulk
            jobs where you download your PDFs as Markdown together. Responses are
            Markdown text, so they drop straight into a file, a database or a RAG
            pipeline.
          </p>
        </div>
      </section>

      <section className="block" id="faq" style={{ background: "#fff" }}>
        <div className="container">
          <div className="section-head">
            <h2>PDF to Markdown API — common questions</h2>
          </div>
          <div className="faq">
            <details open>
              <summary>Is the PDF to Markdown API the same engine as the site?</summary>
              <p>
                Yes. The API uses the same conversion engine as the browser tool,
                so headings, lists and structure behave the same whether you
                convert PDF to Markdown by hand or by script.
              </p>
            </details>
            <details>
              <summary>Can I convert PDF to Markdown in Python?</summary>
              <p>
                Yes — send the file as multipart form data with a POST request
                (see the Python snippet above) and write the Markdown response to
                disk.
              </p>
            </details>
            <details>
              <summary>Does the API support batch PDF to Markdown?</summary>
              <p>
                Batch is supported via the batch endpoint or by looping calls. For
                bulk work you can also download your PDFs as Markdown from the
                batch tool on the site.
              </p>
            </details>
            <details>
              <summary>Is there a free tier for the PDF to Markdown API?</summary>
              <p>
                Yes. A free tier covers everyday automation. Paid plans add higher
                rate limits and larger file support for production pipelines.
              </p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
