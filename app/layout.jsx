import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://www.dlpdfs.com"),
  title: {
    default: "PDF to MD & PDF to Markdown Converter — Fast, Private, No Software",
    template: "%s | PDF to MD & PDF to Markdown",
  },
  description:
    "Convert PDF to Markdown online in seconds. Clean headings, lists, tables and code blocks preserved. Also convert HTML to MD and download your PDFs as Markdown in batch. Free, private, no install.",
  keywords: [
    "pdf to markdown",
    "pdf to md",
    "convert pdf to markdown",
    "pdf markdown converter",
    "html to md",
    "html to markdown",
    "pdfs download",
    "download pdf as markdown",
    "markdown converter",
    "pdf to markdown online",
    "batch pdf to markdown",
    "pdf to markdown api",
  ],
  authors: [{ name: "PDF Tool Team" }],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "PDF to MD & PDF to Markdown Converter — Fast, Private, No Software",
    description:
      "Turn PDFs into clean, editable Markdown. Also HTML to MD and batch PDFs download. No install, private, free.",
    type: "website",
    locale: "en_US",
    siteName: "PDF Tool",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to MD & PDF to Markdown Converter — Fast, Private, No Software",
    description:
      "Turn PDFs into clean, editable Markdown. Also HTML to MD and batch PDFs download.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

function WebAppJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "PDF Tool",
    url: "https://www.dlpdfs.com/",
    description:
      "Convert PDF to Markdown online. Preserve headings, lists, tables and code blocks. Also supports HTML to MD and batch PDFs download.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "91",
      bestRating: "5",
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WebAppJsonLd />
        <header className="site-header">
          <div className="container inner">
            <a className="brand" href="/" style={{ textDecoration: "none" }}>
              <img className="brand-logo" src="/logo.png" alt="PDF Tool" />
              PDF Tool
            </a>
            <nav className="nav">
              <a href="/#convert">Convert</a>
              <a href="/#how">How it works</a>
              <a href="/#features">Features</a>
              <a href="/html-to-md">HTML to MD</a>
              <a href="/batch-pdf-to-markdown">Batch</a>
              <a href="/pdf-to-markdown-api">API</a>
              <a href="/#reviews">Reviews</a>
              <a href="/#faq">FAQ</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="container">
            <div className="footer-grid">
              <div>
                <div className="brand" style={{ color: "#fff", marginBottom: 10 }}>
                  <img className="brand-logo" src="/logo.png" alt="PDF Tool" />
                  PDF Tool
                </div>
                <p style={{ fontSize: 14, maxWidth: 280 }}>
                  A fast, private way to convert PDF to Markdown and HTML to MD.
                  Download your PDFs as clean Markdown in seconds.
                </p>
              </div>
              <div>
                <h4>Convert</h4>
                <ul>
                  <li><a href="/">PDF to Markdown</a></li>
                  <li><a href="/html-to-md">HTML to Markdown</a></li>
                  <li><a href="/batch-pdf-to-markdown">Batch PDFs Download</a></li>
                  <li><a href="/pdf-to-markdown-api">PDF to Markdown API</a></li>
                </ul>
              </div>
              <div>
                <h4>Resources</h4>
                <ul>
                  <li><a href="/#how">How it works</a></li>
                  <li><a href="/#reviews">User reviews</a></li>
                  <li><a href="/#faq">FAQ</a></li>
                  <li><a href="/#limits">File limits</a></li>
                </ul>
              </div>
              <div>
                <h4>Use cases</h4>
                <ul>
                  <li><a href="/#reviews">For researchers</a></li>
                  <li><a href="/#reviews">For developers</a></li>
                  <li><a href="/#reviews">For students</a></li>
                  <li><a href="/#reviews">For AI / RAG</a></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              © {new Date().getFullYear()} PDF Tool. PDF to Markdown, HTML to MD and
              batch PDFs download — built for clean, editable documents.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
