import { TopicLayout } from '@/components/TopicLayout';

const headingsCode = `// Headings (H1-H6): Content hierarchy for SEO and accessibility

// ✅ Proper heading structure
export default function ArticlePage() {
  return (
    <article className="max-w-4xl mx-auto">
      {/* One H1 per page - main topic */}
      <h1 className="text-4xl font-bold mb-4">
        JavaScript Closures: Complete Guide
      </h1>

      {/* H2 for main sections */}
      <section>
        <h2 className="text-3xl font-semibold mt-8 mb-4">
          What are Closures?
        </h2>
        <p>Closures are functions that have access to outer scope...</p>

        {/* H3 for subsections */}
        <h3 className="text-2xl font-medium mt-6 mb-3">
          Lexical Environment
        </h3>
        <p>Every function creates a lexical environment...</p>

        {/* H4 for sub-subsections */}
        <h4 className="text-xl font-medium mt-4 mb-2">
          Variable Lookup
        </h4>
        <p>Variables are resolved through scope chain...</p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mt-8 mb-4">
          Common Use Cases
        </h2>
        
        <h3 className="text-2xl font-medium mt-6 mb-3">
          Data Privacy
        </h3>
        <p>Closures create private variables...</p>

        <h3 className="text-2xl font-medium mt-6 mb-3">
          Event Handlers
        </h3>
        <p>Preserve state in callbacks...</p>
      </section>
    </article>
  );
}

// ✅ Dynamic heading generation with proper hierarchy
export default function TopicPage({ topic }: { topic: Topic }) {
  return (
    <article>
      <h1>{topic.title}</h1>
      
      {topic.sections.map((section, i) => (
        <section key={i}>
          <h2>{section.title}</h2>
          <p>{section.content}</p>
          
          {section.subsections?.map((sub, j) => (
            <div key={j}>
              <h3>{sub.title}</h3>
              <p>{sub.content}</p>
            </div>
          ))}
        </section>
      ))}
    </article>
  );
}

// ✅ Table of contents from headings
export default function ArticleWithTOC() {
  return (
    <div className="grid grid-cols-4 gap-8">
      <aside className="col-span-1">
        <nav aria-label="Table of contents">
          <h2 className="text-lg font-semibold mb-2">Contents</h2>
          <ul className="space-y-1">
            <li><a href="#what-are-closures">What are Closures?</a></li>
            <li><a href="#use-cases">Common Use Cases</a></li>
            <li><a href="#examples">Code Examples</a></li>
          </ul>
        </nav>
      </aside>

      <article className="col-span-3">
        <h1>JavaScript Closures</h1>
        
        <section id="what-are-closures">
          <h2>What are Closures?</h2>
        </section>
        
        <section id="use-cases">
          <h2>Common Use Cases</h2>
        </section>
      </article>
    </div>
  );
}

// ❌ Bad heading structure
function BadExample() {
  return (
    <div>
      <h1>Main Title</h1>
      <h3>Skipped H2</h3> {/* ❌ Don't skip levels */}
      <h1>Another H1</h1> {/* ❌ Only one H1 per page */}
      <div className="text-2xl font-bold">Not a heading</div> {/* ❌ Use semantic HTML */}
    </div>
  );
}`;

const Headings = () => {
  return (
    <TopicLayout
      title="Headings Structure (H1-H6)"
      route="/seo/on-page/headings"
      category="javascript"
      explanation="Headings create content hierarchy. One H1 (main topic), multiple H2s (sections), H3s (subsections). Search engines use headings to understand page structure. Screen readers use them for navigation. Proper hierarchy improves SEO and accessibility."
      code={headingsCode}
      codeFilename="headings.tsx"
      whyItMatters="Headings signal content importance to search engines. Proper structure improves rankings and user experience. Interviewers ask: 'How many H1s per page?', 'Why semantic HTML matters?', 'Heading hierarchy?' Shows understanding of accessibility and SEO."
      mistakes={[
        "Multiple H1s: Confuses search engines about main topic. Use one H1.",
        "Skipping levels: H1 → H3 breaks hierarchy. Go H1 → H2 → H3.",
        "Styling instead of semantics: <div class='big-text'> instead of <h2>.",
        "No headings: Wall of text is hard to scan for users and search engines.",
      ]}
      practiceTask="Refactor a blog post to use proper heading hierarchy: one H1 for title, H2 for main sections, H3 for subsections. Add a table of contents component that auto-generates from headings using IDs."
    />
  );
};

export default Headings;