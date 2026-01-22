import { TopicLayout } from '@/components/TopicLayout';
import { StepByStepPreview } from '@/components/StepByStepPreview';

const semanticHtmlSteps = [
  {
    title: 'Basic HTML Structure',
    description: 'Start with a simple div-based layout',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
  </style>
</head>
<body>
  <div>
    <div>My Website</div>
    <div>Welcome to my site</div>
  </div>
</body>
</html>`,
    highlight: 'Using generic divs - not semantic',
  },
  {
    title: 'Add Semantic Header',
    description: 'Replace the first div with a semantic <header> element',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    header { background: #4F46E5; color: white; padding: 20px; border-radius: 8px; }
  </style>
</head>
<body>
  <header>
    <h1>My Website</h1>
  </header>
  <div>Welcome to my site</div>
</body>
</html>`,
    highlight: 'Added <header> and <h1> for better structure',
  },
  {
    title: 'Add Main Content Area',
    description: 'Wrap content in semantic <main> element',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    header { background: #4F46E5; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    main { background: #F3F4F6; padding: 20px; border-radius: 8px; }
  </style>
</head>
<body>
  <header>
    <h1>My Website</h1>
  </header>
  <main>
    <p>Welcome to my site</p>
  </main>
</body>
</html>`,
    highlight: 'Added <main> to identify primary content',
  },
  {
    title: 'Add Navigation',
    description: 'Include a <nav> element for site navigation',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    header { background: #4F46E5; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    nav { background: #E0E7FF; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
    nav a { margin-right: 15px; color: #4F46E5; text-decoration: none; font-weight: 500; }
    main { background: #F3F4F6; padding: 20px; border-radius: 8px; }
  </style>
</head>
<body>
  <header>
    <h1>My Website</h1>
  </header>
  <nav>
    <a href="#home">Home</a>
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
  </nav>
  <main>
    <p>Welcome to my site</p>
  </main>
</body>
</html>`,
    highlight: 'Added <nav> with links for navigation',
  },
  {
    title: 'Add Article Section',
    description: 'Use <article> for self-contained content',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    header { background: #4F46E5; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    nav { background: #E0E7FF; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
    nav a { margin-right: 15px; color: #4F46E5; text-decoration: none; font-weight: 500; }
    main { background: #F3F4F6; padding: 20px; border-radius: 8px; }
    article { background: white; padding: 20px; border-radius: 8px; margin-top: 15px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    article h2 { color: #1F2937; margin-top: 0; }
  </style>
</head>
<body>
  <header>
    <h1>My Website</h1>
  </header>
  <nav>
    <a href="#home">Home</a>
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
  </nav>
  <main>
    <p>Welcome to my site</p>
    <article>
      <h2>Latest Post</h2>
      <p>This is an independent piece of content that makes sense on its own.</p>
    </article>
  </main>
</body>
</html>`,
    highlight: 'Added <article> for standalone content',
  },
  {
    title: 'Complete with Footer',
    description: 'Add <footer> to complete the semantic structure',
    code: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    header { background: #4F46E5; color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    nav { background: #E0E7FF; padding: 15px; border-radius: 8px; margin-bottom: 20px; }
    nav a { margin-right: 15px; color: #4F46E5; text-decoration: none; font-weight: 500; }
    main { background: #F3F4F6; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    article { background: white; padding: 20px; border-radius: 8px; margin-top: 15px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
    article h2 { color: #1F2937; margin-top: 0; }
    footer { background: #374151; color: white; padding: 15px; border-radius: 8px; text-align: center; }
  </style>
</head>
<body>
  <header>
    <h1>My Website</h1>
  </header>
  <nav>
    <a href="#home">Home</a>
    <a href="#about">About</a>
    <a href="#contact">Contact</a>
  </nav>
  <main>
    <p>Welcome to my site</p>
    <article>
      <h2>Latest Post</h2>
      <p>This is an independent piece of content that makes sense on its own.</p>
    </article>
  </main>
  <footer>
    <p>&copy; 2024 My Website. All rights reserved.</p>
  </footer>
</body>
</html>`,
    highlight: 'Added <footer> - now fully semantic!',
  },
];

const semanticCode = `// Semantic HTML: Use meaningful elements instead of divs

// ❌ Bad: Generic divs
<div class="header">
  <div class="title">My Site</div>
</div>
<div class="content">
  <div class="post">Article content</div>
</div>

// ✅ Good: Semantic elements
<header>
  <h1>My Site</h1>
</header>
<main>
  <article>Article content</article>
</main>

// ✅ Complete semantic structure
<body>
  <header>
    <h1>Site Title</h1>
    <nav>
      <a href="#home">Home</a>
      <a href="#about">About</a>
    </nav>
  </header>
  
  <main>
    <article>
      <h2>Article Title</h2>
      <p>Content...</p>
    </article>
    
    <aside>
      <h3>Related Links</h3>
    </aside>
  </main>
  
  <footer>
    <p>&copy; 2024 Company</p>
  </footer>
</body>`;

const SemanticHtml = () => {
  return (
    <div className="space-y-8">
      <TopicLayout
        title="Semantic HTML"
        route="/html/semantic"
        category="html"
        explanation="Semantic HTML uses meaningful elements (header, nav, main, article, footer) instead of generic divs. Improves accessibility, SEO, and code readability. Screen readers and search engines understand page structure better."
        code={semanticCode}
        codeFilename="semantic.html"
        whyItMatters="Better SEO rankings, accessibility for screen readers, easier maintenance. Interviewers ask: 'Why semantic HTML?', 'Difference between div and section?', 'How does it help SEO?' Shows professional HTML knowledge."
        mistakes={[
          "Using divs for everything: Loses meaning and accessibility benefits.",
          "Multiple <main> elements: Only one main per page.",
          "Wrong nesting: <article> can contain <section>, not vice versa.",
          "Skipping <header>/<footer>: Even simple pages benefit from semantic structure.",
        ]}
        practiceTask="Convert a div-based blog layout to semantic HTML. Use header, nav, main, article, aside, and footer. Validate with HTML validator and test with screen reader."
      />

      <div className="border-t pt-8">
        <StepByStepPreview
          title="Building Semantic HTML Step by Step"
          steps={semanticHtmlSteps}
        />
      </div>
    </div>
  );
};

export default SemanticHtml;