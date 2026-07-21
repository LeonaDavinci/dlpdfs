import BatchConverter from "@/components/BatchConverter";

export const metadata = {
  title: "Batch PDF to Markdown — Convert & Download Multiple PDFs as Markdown",
  description:
    "Batch convert PDF to Markdown and download all your PDFs as Markdown in one ZIP. Convert many PDFs to Markdown at once, free and private, no software to install. Also a PDF to Markdown API for pipelines.",
  keywords: [
    "batch pdf to markdown",
    "bulk pdf to markdown",
    "convert multiple pdf to markdown",
    "download pdfs as markdown",
    "pdfs download",
    "batch convert pdf to md",
    "pdf to markdown online",
  ],
  alternates: { canonical: "/batch-pdf-to-markdown" },
};

export default function BatchPage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>Batch PDF to Markdown</h1>
            <p className="lede">
              Convert many PDFs to Markdown at once and{" "}
              <b>download your PDFs as Markdown</b> in a single ZIP. Drop a whole
              folder of reports, papers or manuals, and get clean, editable
              Markdown for each one — processed in your browser, no uploads, no
              install. Pair it with our <a href="/">PDF to Markdown</a> tool and
              the <a href="/pdf-to-markdown-api">PDF to Markdown API</a>.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="#convert">
                Start batch convert
              </a>
              <a className="btn btn-ghost" href="/pdf-to-markdown-api">
                Use the API instead
              </a>
            </div>
            <p className="trust">
              Runs in your browser · one ZIP for all PDFs · free tier included
            </p>
          </div>
          <BatchConverter />
        </div>
      </section>

      <section className="block" id="how">
        <div className="container">
          <div className="section-head">
            <h2>How batch PDF to Markdown works</h2>
            <p>
              Turn a pile of PDFs into Markdown in three steps — the fastest way
              to convert PDFs to Markdown in bulk.
            </p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="num">1</div>
              <h3>Add your PDFs</h3>
              <p>
                Drop or select several PDFs at once. Batch PDF to Markdown accepts
                native digital PDFs of any common size and queues them
                automatically.
              </p>
            </div>
            <div className="step">
              <div className="num">2</div>
              <h3>Convert to Markdown</h3>
              <p>
                Each PDF is converted to Markdown in turn, keeping headings, lists
                and structure. You see a live log as every file finishes.
              </p>
            </div>
            <div className="step">
              <div className="num">3</div>
              <h3>Download your PDFs</h3>
              <p>
                All Markdown files are bundled into one ZIP —{" "}
                <b>download your PDFs as Markdown</b> together instead of saving
                them one by one.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="block" style={{ background: "#fff" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <h2 style={{ fontSize: 28 }}>
            Why use batch PDF to Markdown
          </h2>
          <p>
            Manually converting ten PDFs to Markdown means ten uploads, ten
            downloads and a lot of tab-switching. Batch PDF to Markdown collapses
            that into a single action: queue the documents, walk away, and come
            back to one ZIP containing every file as clean Markdown. It is the
            natural next step after our single-file{" "}
            <a href="/">PDF to Markdown</a> converter, and a great fit before you
            move to the <a href="/pdf-to-markdown-api">PDF to Markdown API</a> for
            fully automated pipelines.
          </p>
          <p>
            Use cases are everywhere: a researcher converting a stack of papers, a
            developer turning API specs into docs, a student batching lecture
            slides, or a team migrating a document library into Notion, Obsidian or
            a Git repo. In every case, being able to{" "}
            <b>download your PDFs as Markdown</b> in one go saves real time.
          </p>
        </div>
      </section>

      <section className="block">
        <div className="container" style={{ maxWidth: 820 }}>
          <h2 style={{ fontSize: 28 }}>Tips for clean batch output</h2>
          <p>
            The PDFs that convert best to Markdown are native digital documents —
            Word exports, reports, manuals and specs. Scanned or image-only PDFs
            have no text layer, so they need OCR before batch PDF to Markdown can
            read them. If a single file in your batch is scanned, that one will be
            skipped with a note while the rest still convert, so the ZIP is never
            empty.
          </p>
          <p>
            For very large libraries, split into a few batches so each ZIP stays
            easy to review. And when the job is recurring, the{" "}
            <a href="/pdf-to-markdown-api">PDF to Markdown API</a> lets you run
            the same conversion from a script instead of the browser.
          </p>
        </div>
      </section>

      <section className="block" id="faq" style={{ background: "#fff" }}>
        <div className="container">
          <div className="section-head">
            <h2>Batch PDF to Markdown — common questions</h2>
          </div>
          <div className="faq">
            <details open>
              <summary>Can I really download multiple PDFs as Markdown?</summary>
              <p>
                Yes. Batch PDF to Markdown converts every selected PDF and bundles
                the results into one ZIP, so you download your PDFs as Markdown in
                a single click.
              </p>
            </details>
            <details>
              <summary>Is batch PDF to Markdown free?</summary>
              <p>
                The free tier covers everyday batch jobs. Larger or recurring
                batches are available on paid plans, and the PDF to Markdown API
                is the option for programmatic scale.
              </p>
            </details>
            <details>
              <summary>Are my PDFs uploaded when I batch convert?</summary>
              <p>
                No. Conversion runs in your browser, so the PDFs never leave your
                device. That makes batch PDF to Markdown both private and fast.
              </p>
            </details>
            <details>
              <summary>What if one PDF in the batch is scanned?</summary>
              <p>
                That file is reported in the log and skipped; the rest still
                convert and are included in the ZIP. Run OCR on the scanned file
                first, then re-add it.
              </p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}
