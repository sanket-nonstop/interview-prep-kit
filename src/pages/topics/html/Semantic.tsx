import { TopicLayout } from '@/components/TopicLayout';

const semanticCode = `// Semantic HTML: Meaningful structure for accessibility & SEO

// ✅ Proper document structure
<body>
  <header>
    <nav aria-label="Main navigation">
      <a href="/">Logo</a>
      <ul role="list">
        <li><a href="/products">Products</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <header>
        <h1>Article Title</h1>
        <time dateTime="2024-01-15">January 15, 2024</time>
      </header>
      
      <section aria-labelledby="intro">
        <h2 id="intro">Introduction</h2>
        <p>Content paragraph...</p>
      </section>

      <figure>
        <img src="/chart.png" alt="Sales growth chart showing 40% increase" />
        <figcaption>Q4 2024 sales performance</figcaption>
      </figure>

      <aside>
        <h3>Related Articles</h3>
        <ul>...</ul>
      </aside>
    </article>
  </main>

  <footer>
    <nav aria-label="Footer navigation">...</nav>
    <address>
      Contact: <a href="mailto:team@company.com">team@company.com</a>
    </address>
    <small>&copy; 2024 Company Name</small>
  </footer>
</body>

// ✅ Common semantic elements:
// <main>     → Primary content (one per page)
// <article>  → Self-contained, redistributable content
// <section>  → Thematic grouping with heading
// <aside>    → Tangentially related content
// <nav>      → Navigation links
// <figure>   → Self-contained media with caption
// <time>     → Machine-readable date/time
// <address>  → Contact information`;

const Semantic = () => {
  return (
    <TopicLayout
      title="Semantic HTML"
      route="/html/semantic"
      category="html"
      explanation="Semantic HTML uses elements that describe their meaning (article, section, nav) instead of generic divs. This improves accessibility for screen readers, SEO ranking, and code maintainability."
      code={semanticCode}
      codeFilename="semantic.html"
      codeLanguage="html"
      whyItMatters="Interviewers ask about semantic HTML to gauge accessibility awareness. Senior developers know that proper semantics reduce the need for ARIA attributes, improve SEO, and make code self-documenting. It's a quality signal."
      mistakes={[
        "Divs everywhere: div and span have no meaning. Use semantic elements when applicable.",
        "Multiple h1 tags: One h1 per page. Use heading hierarchy (h1 → h2 → h3).",
        "Links as buttons: <a> for navigation, <button> for actions. Never use div for either.",
        "Missing alt text: Images need descriptive alt. Decorative images use alt=\"\".",
      ]}
      practiceTask="Refactor a blog homepage that uses only divs into semantic HTML. Include: header with nav, main content with multiple article cards, sidebar with related content, and a proper footer."
    />
  );
};

export default Semantic;
