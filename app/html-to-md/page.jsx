import ConverterWidget from "@/components/ConverterWidget";

export const metadata = {
  title: "HTML to Markdown Converter — Convert HTML to MD Online",
  description:
    "Convert HTML to MD online in one click. Paste HTML and get clean Markdown instantly. Also convert PDF to Markdown and download your PDFs as Markdown in batch. Free, private, no install.",
  keywords: [
    "html to md",
    "html to markdown",
    "convert html to markdown",
    "html to markdown online",
    "markdown converter",
    "pdf to markdown",
    "pdfs download",
  ],
  alternates: { canonical: "/html-to-md" },
};

export default function HtmlToMd() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>HTML to Markdown Converter</h1>
            <p className="lede">
              Convert <b>HTML to MD</b> in one click. Paste your HTML and get
              clean, editable Markdown with headings, lists, links and bold text
              preserved. Pair it with our <a href="/">PDF to Markdown</a> tool and{" "}
              <b>download your PDFs as Markdown</b> in batch.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="#convert">
                Convert HTML to MD
              </a>
              <a className="btn btn-ghost" href="/">
                Also convert PDF to Markdown
              </a>
            </div>
            <p className="trust">
              Runs in your browser · no upload · free to use
            </p>
          </div>
          <ConverterWidget defaultMode="html" />
        </div>
      </section>

      <section className="block" id="how">
        <div className="container">
          <div className="section-head">
            <h2>How to convert HTML to MD</h2>
            <p>
              Three steps from a web page to clean Markdown — and a natural
              companion to PDF to Markdown when your source is a site, not a file.
            </p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="num">1</div>
              <h3>Paste your HTML</h3>
              <p>
                Copy the page source or an HTML snippet and drop it into the
                HTML to MD box. Nothing is uploaded.
              </p>
            </div>
            <div className="step">
              <div className="num">2</div>
              <h3>Convert to Markdown</h3>
              <p>
                Click Convert. Headings become # / ##, lists become bullets, and
                links keep their targets — clean MD in one pass.
              </p>
            </div>
            <div className="step">
              <div className="num">3</div>
              <h3>Download the .md</h3>
              <p>
                Save the Markdown or combine it with output from PDF to Markdown
                to download your PDFs as Markdown in one batch.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="block" style={{ background: "#fff" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <h2 style={{ fontSize: 28 }}>HTML to MD, and PDF to Markdown</h2>
          <p>
            Not every source is a PDF. When content lives on a web page, convert{" "}
            <b>HTML to MD</b> directly — it is faster than copy-pasting and
            reformatting by hand. Keep the result next to the Markdown you get
            from <a href="/">PDF to Markdown</a>, and use batch mode to{" "}
            <b>download your PDFs as Markdown</b> together with the HTML-derived
            notes.
          </p>
          <p>
            Writers, researchers and developers use both tools in the same
            workflow: scrape or export to HTML, convert HTML to MD, and convert
            PDF to Markdown for the documents that only exist as files. One
            consistent Markdown format, ready for Notion, Obsidian or Git.
          </p>
        </div>
      </section>

      <section className="block" id="faq">
        <div className="container">
          <div className="section-head">
            <h2>HTML to MD — common questions</h2>
          </div>
          <div className="faq">
            <details open>
              <summary>Does HTML to MD keep my links and headings?</summary>
              <p>
                Yes. The converter maps H1–H4 to Markdown headings, preserves
                bold and italic, turns lists into bullets, and keeps anchor
                links intact.
              </p>
            </details>
            <details>
            <summary>Is my HTML uploaded?</summary>
            <p>
              No. HTML to MD runs entirely in your browser, so the markup never
              leaves your device. PDF to Markdown runs in your browser too, using
              pdf.js to read the text layer locally — nothing is uploaded.
            </p>
            </details>
            <details>
              <summary>Can I combine HTML to MD with PDF to Markdown?</summary>
              <p>
                Absolutely. Convert each source, then use batch mode on the PDF
                side to download your PDFs as Markdown in one ZIP alongside your
                HTML-derived notes.
              </p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
