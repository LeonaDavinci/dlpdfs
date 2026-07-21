import ConverterWidget from "@/components/ConverterWidget";
import Experiences from "@/components/Experiences";

const FAQ = [
  {
    q: "Is the PDF to MD converter free?",
    a: "Yes. The free tier lets you convert PDF to MD without creating an account. Batch PDFs download and larger file handling are available on paid plans.",
  },
  {
    q: "How fast is PDF to MD conversion?",
    a: "Most documents finish in under 30 seconds. A typical 20-page PDF becomes Markdown in roughly 10 to 15 seconds, and small memos are done in under 10 seconds.",
  },
  {
    q: "Does it also convert HTML to MD?",
    a: "Yes. Switch to HTML to MD mode, paste your HTML source, and get clean Markdown instantly in your browser. It is the fastest path when a page blocks copy-paste.",
  },
  {
    q: "What PDFs work best for PDF to Markdown?",
    a: "Native digital PDFs — reports, Word exports, papers, manuals and specs — convert with the best structure. Image-only or scanned PDFs need OCR first, because the tool reads a text layer rather than pictures of pages.",
  },
  {
    q: "Are my files private?",
    a: "Your files are processed only to produce the Markdown and are not used to train models. You can delete them after you download your PDFs as Markdown.",
  },
  {
    q: "Is there a PDF to Markdown API?",
    a: "Yes. A PDF to Markdown API is available for pipelines, scripts and RAG workflows, so you can convert PDF to MD programmatically at scale.",
  },
  {
    q: "Can I download multiple PDFs as Markdown?",
    a: "Yes. Use batch mode to convert several PDFs to MD and download them together as a single ZIP. This is the easiest way to convert PDFs to MD in bulk.",
  },
  {
    q: "What are the file limits for PDF to Markdown?",
    a: "The free tier supports common document sizes. See the file limits section for the current caps on pages and megabytes before you convert PDF to MD.",
  },
];

function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <FaqJsonLd />

      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <h1>PDF to Markdown &amp; PDF to MD Converter</h1>
            <p className="lede">
              Convert PDF to Markdown — also called PDF to MD — online in seconds.
              Get clean, editable Markdown with headings, lists, tables and code
              blocks preserved. Also convert <b>HTML to MD</b> and{" "}
              <b>download your PDFs as Markdown</b> in batch — free and private,
              no software to install.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="#convert">
                Convert PDF to MD
              </a>
              <a className="btn btn-ghost" href="/html-to-md">
                Try HTML to MD
              </a>
            </div>
            <p className="trust">
              <b>4.8 / 5</b> from 100 real reviewers · average conversion under{" "}
              <b>30 seconds</b> · no account required
            </p>
          </div>
          <ConverterWidget />
        </div>
      </section>

      {/* STATS */}
      <section className="block" style={{ paddingTop: 28, paddingBottom: 0 }}>
        <div className="container">
          <div className="stats">
            <div>
              <div className="n">100+</div>
              <div className="l">user reviews</div>
            </div>
            <div>
              <div className="n">&lt;30s</div>
              <div className="l">average PDF to MD time</div>
            </div>
            <div>
              <div className="n">Free</div>
              <div className="l">no account needed</div>
            </div>
            <div>
              <div className="n">Batch</div>
              <div className="l">PDFs download as ZIP</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="block" id="how">
        <div className="container">
          <div className="section-head">
            <h2>How to convert PDF to MD in three steps</h2>
            <p>
              Turning a PDF into Markdown (PDF to MD) takes less than a minute.
              Here is the exact flow our users follow every day.
            </p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="num">1</div>
              <h3>Upload your PDF</h3>
              <p>
                Drop a PDF into the box or click to select it. The PDF to MD
                converter accepts native digital PDFs of any common size.
              </p>
            </div>
            <div className="step">
              <div className="num">2</div>
              <h3>Convert to Markdown</h3>
              <p>
                Press Convert. The engine reads the text layer and rebuilds your
                document as Markdown, keeping headings, lists and code blocks.
              </p>
            </div>
            <div className="step">
              <div className="num">3</div>
              <h3>Download the .md</h3>
              <p>
                Save the Markdown file, paste it into Notion, commit it to Git,
                or download your PDFs as Markdown in one batch ZIP.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="block" id="features" style={{ background: "#fff" }}>
        <div className="container">
          <div className="section-head">
            <h2>Why our PDF to MD converter stands out</h2>
            <p>
              A focused PDF to MD tool built for clean output, speed and privacy —
              plus HTML to MD and batch PDFs download.
            </p>
          </div>
          <div className="cards">
            <div className="card">
              <h3>Clean Markdown structure</h3>
              <p>
                PDF to MD keeps your H1–H3 headings, bullet lists, tables and code
                blocks so the result is ready to edit.
              </p>
            </div>
            <div className="card">
              <h3>Fast PDF to MD</h3>
              <p>
                Most files convert in under 30 seconds. Small memos finish in
                single digits, so the tool fits between meetings.
              </p>
            </div>
            <div className="card">
              <h3>HTML to MD built in</h3>
              <p>
                Not just PDFs — paste HTML and convert it to Markdown instantly.
                Great when a site blocks copy-paste or you scrape a page.
              </p>
            </div>
            <div className="card">
              <h3>Batch PDFs download</h3>
              <p>
                Queue several documents and download your PDFs as Markdown in a
                single ZIP. One step instead of ten.
              </p>
            </div>
            <div className="card">
              <h3>Private by design</h3>
              <p>
                Files are processed only to make your Markdown and are not used
                to train models. Delete them after you download.
              </p>
            </div>
            <div className="card">
              <h3>No install needed</h3>
              <p>
                Everything runs in the browser. Convert PDF to MD from any laptop,
                tablet or phone without installing software.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LONG-FORM SEO COPY */}
      <section className="block">
        <div className="container" style={{ maxWidth: 820 }}>
          <h2 style={{ fontSize: 28 }}>
            The easiest way to convert PDF to MD
          </h2>
          <p>
            PDFs are great for sharing but painful to edit. When you convert PDF
            to MD, the document becomes plain text you can version in Git, search
            in a wiki, or feed into an LLM. Our PDF to MD converter is built for
            exactly that: it reads the structure of a native PDF and rewrites it
            as Markdown, so headings stay headings and lists stay lists.
          </p>
          <p>
            Beyond PDFs, the tool also handles <b>HTML to MD</b>. If you have a web
            page or an exported HTML file, paste it in and get Markdown
            immediately. And when you have more than one document, batch mode lets
            you <b>download your PDFs as Markdown</b> together — a single ZIP
            instead of dozens of manual saves. That is why teams use our PDF to MD
            converter for documentation, research and AI pipelines.
          </p>
          <p>
            Speed matters. A 20-page report becomes Markdown in roughly 10 to 15
            seconds, and the output is clean enough to drop straight into Notion
            or Obsidian. If you need it programmatically, the <b>PDF to Markdown
            API</b> lets you automate conversions inside scripts and RAG workflows.
          </p>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="block" id="reviews" style={{ background: "#fff" }}>
        <div className="container">
          <div className="section-head">
            <h2>What 100 users say about PDF to MD &amp; PDF to Markdown</h2>
            <p>
              Real experiences: how people use the tool, which PDFs convert
              cleanly, where it struggles, how fast it is, the file limits, and
              how teams share Markdown. Filter by topic below.
            </p>
          </div>
          <Experiences />
        </div>
      </section>

      {/* FILE LIMITS */}
      <section className="block" id="limits">
        <div className="container" style={{ maxWidth: 820 }}>
          <h2 style={{ fontSize: 28 }}>PDF to MD &amp; PDF to Markdown file limits</h2>
          <p>
            The free tier covers everyday documents. You can convert PDF to MD
            files up to a generous size and page count without paying, and batch
            mode lets you process many PDFs and download them as Markdown
            together. Very large or scanned PDFs may need splitting or OCR first —
            native digital PDFs always give the cleanest Markdown.
          </p>
          <p>
            If a file is over the cap, compress it or split it into chapters, then
            run PDF to MD on each part. Users regularly convert 100+ page theses
            and 100 MB decks without hitting a wall.
          </p>
        </div>
      </section>

      {/* API */}
      <section className="block" id="api" style={{ background: "#fff" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <h2 style={{ fontSize: 28 }}>PDF to MD &amp; PDF to Markdown API for pipelines</h2>
          <p>
            Need to convert PDF to MD at scale? The PDF to Markdown API lets you
            send documents from a script, a cron job, or a RAG pipeline and get
            structured Markdown back. It is the same engine that powers the browser
            tool, so batch PDFs download and clean headings work everywhere.
          </p>
          <p>
            <a href="#convert">Try the converter above</a> first, then move to the
            API when you are ready to automate.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="block" id="faq">
        <div className="container">
          <div className="section-head">
            <h2>PDF to MD &amp; PDF to Markdown — frequently asked questions</h2>
          </div>
          <div className="faq">
            {FAQ.map((f, i) => (
              <details key={i} open={i === 0}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
