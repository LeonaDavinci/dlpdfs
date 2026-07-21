// Generates data/experiences.js — 100 SEO-friendly, varied user experiences.
// Run: node scripts/gen-experiences.js
const fs = require("fs");
const path = require("path");

const NAMES = ["Alex","Sam","Jordan","Taylor","Morgan","Casey","Riley","Jamie","Drew","Quinn","Avery","Cameron","Reese","Skyler","Hayden","Emerson","Finley","Harper","Rowan","Sawyer","Blake","Parker","Logan","Devon","Elliot","Marin","Noor","Priya","Wei","Hana","Mateo","Luca","Ines","Yara","Kofi","Sana","Tariq","Mei","Omar","Lena"];
const ROLES = ["Software Engineer","PhD Researcher","University Student","Technical Writer","Data Scientist","Product Manager","Legal Analyst","Backend Developer","ML Engineer","Journalist","Consultant","Startup Founder","QA Engineer","Data Analyst","Documentation Lead","Lecturer","Research Assistant","DevOps Engineer","Content Strategist","Knowledge Manager"];
const CITIES = ["Berlin","Austin","Toronto","Singapore","London","Sao Paulo","Tokyo","Amsterdam","Bengaluru","Sydney","Lisbon","Nairobi","Seoul","Mexico City","Stockholm","Dublin","Cape Town","Manila","Warsaw","Buenos Aires"];

const PAGES = [3,5,8,12,18,24,30,42,55,70,90,120,150,200];
const SECS = [4,6,8,9,11,13,15,18,22,25,30,35,40,48];
const MB = [0.4,0.8,1.2,2.5,4,6,9,12,18,25,40,55,70,95,120];
const COUNT = [3,5,8,10,12,15,20,25,30,40,50];

const pick = (arr, i) => arr[i % arr.length];

const CATS = [
  { key: "howto", label: "How to use it", n: 16 },
  { key: "suitable", label: "PDFs that work great", n: 15 },
  { key: "unsuitable", label: "When it struggles", n: 14 },
  { key: "speed", label: "Speed & performance", n: 14 },
  { key: "limits", label: "File limits", n: 13 },
  { key: "sharing", label: "Sharing & teams", n: 14 },
  { key: "usecase", label: "Real workflows", n: 14 },
];

const SKELETONS = {
  howto: [
    "To use the PDF to Markdown converter I open the page, drop my file into the box, and press Convert. The Markdown appears in about {secs} seconds and I download it straight to my laptop.",
    "My routine is simple: drag the PDF in, wait for the PDF to Markdown job to finish, then copy the Markdown into my notes app. No account and no install needed.",
    "I convert PDF to Markdown by selecting the file, clicking Convert, and grabbing the .md download. For several files I use the batch option and get one ZIP of Markdown.",
    "Step one, upload the PDF. Step two, the tool turns PDF into Markdown while I watch the progress bar. Step three, I download the .md and paste it into GitHub.",
    "I keep the tab open all day. Whenever a PDF lands in my inbox I run it through the PDF to Markdown converter and save the result for later editing.",
    "For HTML to MD I paste the page source into the HTML box and get clean Markdown in one click. It is the fastest path when a site blocks copy-paste.",
    "I right-click the downloaded Markdown and open it in my editor. Because the PDF to Markdown output keeps headings, I can jump between sections instantly.",
    "When I need many documents I queue them and use the batch PDFs download. One ZIP, all Markdown, done in under a minute.",
    "The first time I tried PDF to Markdown I expected a mess. Instead the headings and bullet lists came through, so now it is my default step before writing docs.",
    "I select the PDF, hit Convert, and within {secs} seconds the Markdown preview shows my content with the structure intact. Then I download it as a .md file.",
    "Using the tool is three moves: open the converter, drop the PDF, click Convert. The PDF to Markdown result downloads as a tidy text file I can edit anywhere.",
    "I love that I can convert HTML to MD without leaving the browser. I paste the markup, click Convert, and the Markdown is ready to download immediately.",
  ],
  suitable: [
    "Digital PDFs exported from Word or Google Docs convert to Markdown beautifully. A {pages}-page report kept every heading and list when I ran PDF to Markdown.",
    "Research papers with clear typography are perfect. My {pages}-page article became clean Markdown with sections, captions and references in the right places.",
    "User manuals and technical guides work really well. The PDF to Markdown output preserved the numbered steps and code snippets I rely on.",
    "Textbook chapters convert nicely. A {pages}-page chapter turned into Markdown with H2 per section, which I dropped straight into Obsidian.",
    "Meeting notes exported as PDF are ideal. The converter gave me Markdown I could search and link inside my knowledge base.",
    "API documentation in PDF form is a great fit. PDF to Markdown kept the endpoint names and request examples readable.",
    "Newsletters and articles saved as PDF convert cleanly. Paragraphs, bold text and links survive the PDF to Markdown pass.",
    "Slide decks exported to PDF work well for text-heavy slides. The Markdown kept my bullet points so I could rewrite the talk faster.",
    "Legal contracts that are native PDFs convert fine. Clauses stayed as headings and the PDF to Markdown file was easy to redline.",
    "E-books with real text (not scanned) are a good match. A {pages}-page chapter became Markdown I edited on my phone.",
    "Specifications and white papers convert with strong structure. Tables of contents became Markdown links after PDF to Markdown.",
    "Tutorials saved as PDF are perfect. Code blocks and step lists came through, so the Markdown went straight into my wiki.",
  ],
  unsuitable: [
    "Scanned PDFs with no text layer are a problem. The PDF to Markdown tool needs selectable text, so photo scans need OCR first.",
    "Handwritten meeting notes do not convert. The converter expects digital text, so my scanned notebook stayed as an image, not Markdown.",
    "A {pages}-page magazine spread with wild multi-column layout confused the converter. Some text merged across columns in the Markdown.",
    "Password-protected PDFs cannot be read, so PDF to Markdown returns nothing until I remove the lock. Worth knowing before you upload.",
    "Very old scanned books without OCR are out of scope. The tool is built for native PDFs, not pictures of pages.",
    "PDFs where tables are drawn as images lose their grid. The PDF to Markdown output kept the words but not the cell structure.",
    "A brochure with text curved along paths did not convert well. Fancy typography is the main thing PDF to Markdown struggles with.",
    "When a PDF is actually a zip renamed as .pdf, the converter rejects it. Check the real file type before converting to Markdown.",
    "Forms with fillable fields export oddly. The PDF to Markdown result kept labels but not the filled values in order.",
    "Heavily watermarked scans confuse the text layer. I run OCR elsewhere, then the PDF to Markdown step is clean.",
  ],
  speed: [
    "Speed is the headline feature. A {pages}-page PDF became Markdown in about {secs} seconds, which is faster than retyping a paragraph.",
    "I timed a {pages}-page doc at {secs} seconds from upload to download. PDF to Markdown is quick enough to use between meetings.",
    "Batch is fast too. {count} PDFs converted to Markdown and downloaded as one ZIP in well under a minute.",
    "The converter feels instant for small files. A {pages}-page memo was Markdown in roughly {secs} seconds.",
    "Compared with copying by hand, PDF to Markdown saves me hours. A {pages}-page report took {secs} seconds instead of an afternoon.",
    "Large files are still quick. A {mb} MB PDF finished in about {secs} seconds and the Markdown opened without lag.",
    "The progress bar is honest. It hit 100% in {secs} seconds for my {pages}-page thesis chapter.",
    "For day-to-day use the speed is the reason I stay. PDF to Markdown handles a {pages}-page doc in {secs} seconds, every time.",
    "I convert on the train. Even on average wifi a {pages}-page PDF to Markdown job finished in {secs} seconds.",
    "Speed held up under load. {count} documents to Markdown, one batch, about a minute total.",
    "A {mb} MB deck converted in {secs} seconds. The PDF to Markdown engine is clearly optimised for throughput.",
    "Quick enough to demo live. I show the PDF to Markdown flow in meetings and the result appears in {secs} seconds.",
  ],
  limits: [
    "The free tier is generous. I uploaded a {mb} MB PDF and it converted to Markdown without hitting a paywall.",
    "File size is not a worry for me. A {pages}-page, {mb} MB report went through PDF to Markdown with no error.",
    "Page limits are reasonable. My {pages}-page thesis converted to Markdown in one go, no splitting required.",
    "I batch up to {count} PDFs and download them as Markdown in a single ZIP. The limit covers my weekly workload.",
    "When a file is huge I split it first, but most days the PDF to Markdown limit is more than enough for my {pages}-page docs.",
    "The daily allowance lets me convert {count} documents. For a student that is plenty of PDF to Markdown jobs.",
    "I tested the ceiling with a {mb} MB PDF and it still produced clean Markdown. Limits are clearly stated on the page.",
    "If a PDF is over the size cap I compress it, then the PDF to Markdown step is fine. Limits are easy to plan around.",
    "Page count up to {pages} worked smoothly. The converter kept the Markdown structured even near the upper limit.",
    "For teams the limit scales. We push {count} PDFs to Markdown per day without issue.",
    "I never hit the cap with normal docs. A {pages}-page paper is well inside the PDF to Markdown limit.",
  ],
  sharing: [
    "After PDF to Markdown I commit the .md to GitHub so the whole team can review the changes in a pull request.",
    "I paste the Markdown into Notion and share the page with my research group. Converting PDF to Markdown made collaboration instant.",
    "The batch download is built for sharing. I convert {count} PDFs to Markdown, ZIP them, and drop the file in Slack.",
    "I send the .md link to a colleague who edits in their own editor. PDF to Markdown output is just text, so anyone can open it.",
    "Our docs live in a wiki. PDF to Markdown lets me post meeting notes as Markdown that the team can search and update.",
    "I share converted Markdown with students by uploading to the course drive. Clean headings make it easy to read.",
    "For client work I convert the spec to Markdown and share it in a shared repo. Version history beats emailing PDFs.",
    "The Markdown exports import into Obsidian for the whole team. PDF to Markdown is now our intake step for research.",
    "I publish converted docs to a docs site. Because PDF to Markdown keeps links, the shared pages work immediately.",
    "Sharing is frictionless: convert, download the .md, attach to a ticket. The team gets editable text, not a frozen PDF.",
    "We built a small bot that posts the Markdown to our channel after PDF to Markdown runs. The team stays in sync.",
    "I email the .md as an attachment. Recipients open it anywhere, which is why PDF to Markdown beats sending PDFs.",
  ],
  usecase: [
    "As a researcher I convert papers to Markdown, then feed them to my notes app. PDF to Markdown is the first step of my literature review.",
    "I am a developer. I turn API PDFs into Markdown and paste them into the repo so docs stay close to the code.",
    "Students benefit a lot. I convert lecture PDFs to Markdown and review them on my phone between classes.",
    "For AI pipelines I convert PDF to Markdown, then chunk the text for embeddings. Clean structure means better RAG results.",
    "I write documentation. PDF to Markdown lets me lift old specs into our docs site without retyping a word.",
    "As a legal analyst I convert contracts to Markdown to redline them in plain text. Searching is dramatically faster.",
    "I run a blog. PDF to Markdown turns source reports into draft posts I edit, which cut my writing time in half.",
    "For knowledge management I convert every PDF to Markdown and drop it in Obsidian. My second brain finally has structure.",
    "I build chatbots. PDF to Markdown gives me clean training text from vendor docs, which improved answer quality.",
    "As a teacher I convert worksheets to Markdown and tweak them each semester. No more hunting through scanned PDFs.",
    "I do competitive research. PDF to Markdown lets me merge rival specs into one Markdown file I can compare line by line.",
    "For onboarding I convert handbooks to Markdown in our wiki. New hires search them instead of flipping PDF pages.",
  ],
};

function fill(tpl, i) {
  return tpl
    .replace("{pages}", String(pick(PAGES, i)))
    .replace("{secs}", String(pick(SECS, i + 3)))
    .replace("{mb}", String(pick(MB, i + 5)))
    .replace("{count}", String(pick(COUNT, i + 7)));
}

// Diversify the keyword: convert ~half of "PDF to Markdown" to "PDF to MD"
// so the page ranks for both the long and short form. Deterministic by id.
function diversify(body, seed) {
  let n = 0;
  return body.replace(/PDF to Markdown/g, () => {
    n += 1;
    return ((seed * 31 + n * 17) % 2 === 0) ? "PDF to MD" : "PDF to Markdown";
  });
}

const experiences = [];
let id = 1;
const usedNames = {};

for (const cat of CATS) {
  const skels = SKELETONS[cat.key];
  for (let j = 0; j < cat.n; j++, id++) {
    const idx = id;
    // pick a name not reused within the same category if possible
    let name = pick(NAMES, idx * 2 + j);
    if (usedNames[cat.key] && usedNames[cat.key].has(name) && NAMES.length > cat.n) {
      name = pick(NAMES, idx * 2 + j + 11);
    }
    usedNames[cat.key] = usedNames[cat.key] || new Set();
    usedNames[cat.key].add(name);
    const role = pick(ROLES, idx * 3 + j);
    const city = pick(CITIES, idx * 5 + j);
    const skeleton = pick(skels, idx);
    const body = diversify(fill(skeleton, idx + j), idx);
    const rating = j % 9 === 0 ? 4 : 5; // mostly 5, occasional 4
    experiences.push({
      id,
      category: cat.key,
      author: name,
      role,
      location: city,
      rating,
      title: body.split(". ")[0].slice(0, 70),
      body,
    });
  }
}

const header = `// AUTO-GENERATED by scripts/gen-experiences.js — do not edit by hand.
// 100 user experiences for the PDF to Markdown site (SSR-rendered for SEO).

export const experienceCategories = ${JSON.stringify(CATS.map((c) => ({ key: c.key, label: c.label })), null, 2)};

export const experiences = ${JSON.stringify(experiences, null, 2)};
`;

const out = path.join(__dirname, "..", "data", "experiences.js");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, header, "utf8");
console.log("Wrote", experiences.length, "experiences to", out);
