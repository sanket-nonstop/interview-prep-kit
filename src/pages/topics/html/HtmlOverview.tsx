import { Link } from "react-router-dom";
import {
  Code2,
  Lightbulb,
  Rocket,
  BookOpen,
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

const HtmlOverview = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("old");

  return (
    <div className="animate-fade-in max-w-6xl mx-auto space-y-8">
      {/* Hero */}
      <div className="text-center space-y-4 py-8">
        <div className="text-6xl mb-4">🌐</div>
        <h1 className="text-4xl font-bold">
          HTML{" "}
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Fundamentals
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          The foundation of every website - Learn the building blocks of the web
        </p>
      </div>

      {/* What is HTML */}
      <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-8 h-8" />
            <h2 className="text-2xl font-bold">What is HTML?</h2>
          </div>

          <p className="mb-6 text-white/90 leading-relaxed">
            HTML (HyperText Markup Language) is the standard markup language for
            creating web pages. It describes the structure and content of a
            webpage using elements and tags.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center">
              <div className="text-3xl mb-2">📄</div>
              <div className="font-semibold">Structure</div>
              <div className="text-sm text-white/80">Page layout</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center">
              <div className="text-3xl mb-2">🏷️</div>
              <div className="font-semibold">Tags</div>
              <div className="text-sm text-white/80">Elements markup</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center">
              <div className="text-3xl mb-2">🔗</div>
              <div className="font-semibold">Semantic</div>
              <div className="text-sm text-white/80">Meaningful code</div>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Structure */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">📋 Basic Structure</h3>
          <p className="text-muted-foreground">
            Every HTML document follows this template. The DOCTYPE declares
            HTML5, head contains metadata, and body holds visible content.
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              <span className="font-mono text-orange-500">
                &lt;!DOCTYPE html&gt;
              </span>
              <span className="text-muted-foreground">
                - HTML5 declaration
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="font-mono text-blue-500">&lt;head&gt;</span>
              <span className="text-muted-foreground">- Metadata section</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="font-mono text-green-500">&lt;body&gt;</span>
              <span className="text-muted-foreground">- Visible content</span>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition"></div>

          <pre className="relative bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded-lg overflow-x-auto text-sm">
{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Page</title>
</head>
<body>
  <h1>Hello World!</h1>
</body>
</html>`}
          </pre>
        </div>
      </div>

      {/* Key Concepts */}
      <div className="relative py-8">
        <h2 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-2">
          <BookOpen className="w-6 h-6 text-orange-500" />
          Key Concepts
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: "🏷️",
              title: "Elements & Tags",
              desc: "HTML uses tags like &lt;div&gt;, &lt;p&gt;, &lt;h1&gt; to define elements",
              color: "from-orange-500 to-red-500",
            },
            {
              icon: "🎯",
              title: "Attributes",
              desc: "Tags have attributes like class, id, src to add properties",
              color: "from-blue-500 to-cyan-500",
            },
            {
              icon: "🌳",
              title: "DOM Tree",
              desc: "HTML creates a tree structure of nested elements",
              color: "from-green-500 to-emerald-500",
            },
            {
              icon: "♿",
              title: "Accessibility",
              desc: "Semantic HTML makes sites accessible to everyone",
              color: "from-purple-500 to-pink-500",
            },
          ].map((item, i) => (
            <div key={i} className="group relative">
              <div
                className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500`}
              ></div>

              <div className="relative bg-background p-6 rounded-2xl">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Topics */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Rocket className="w-6 h-6 text-orange-500" />
          Explore HTML Topics
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              title: "Semantic HTML",
              route: "/html/semantic/",
              desc: "Meaningful tags for better structure",
              icon: "📝",
            },
            {
              title: "HTML5 Features",
              route: "/html/html5-features/",
              desc: "Modern HTML capabilities",
              icon: "🚀",
            },
            {
              title: "Forms",
              route: "/html/forms/",
              desc: "User input and validation",
              icon: "📋",
            },
            {
              title: "Tables",
              route: "/html/tables/",
              desc: "Tabular data display",
              icon: "📊",
            },
            {
              title: "Meta Tags",
              route: "/html/meta-tags/",
              desc: "SEO and metadata",
              icon: "🏷️",
            },
            {
              title: "Web APIs",
              route: "/html/web-apis/",
              desc: "Browser APIs and features",
              icon: "🔌",
            },
          ].map((topic) => (
            <Link
              key={topic.route}
              to={topic.route}
              className="border border-border rounded-lg p-4 hover:border-orange-500 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className="text-3xl">{topic.icon}</div>
                <div className="flex-1">
                  <h3 className="font-bold mb-1 group-hover:text-orange-500 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{topic.desc}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Best Practices */}
      <div className="relative">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <Zap className="w-6 h-6 text-green-500" />
          HTML Best Practices
        </h2>

        <div className="space-y-6">
          {[
            {
              title: "Use Semantic Tags",
              desc: "Use &lt;header&gt;, &lt;nav&gt;, &lt;main&gt; instead of generic &lt;div&gt;",
            },
            { title: "Add Alt Text", desc: "Always include alt attributes for images" },
            { title: "Proper Nesting", desc: "Close tags in correct order" },
            { title: "Validate HTML", desc: "Use W3C validator to check errors" },
            { title: "Avoid Inline Styles", desc: "Use CSS files instead of style attributes" },
            { title: "Accessibility First", desc: "Use ARIA labels and proper headings" },
          ].map((item, i) => (
            <div key={i} className="pl-4 border-l-4 border-green-500">
              <div className="font-semibold">{item.title}</div>
              <div className="text-sm text-muted-foreground">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Example */}
      <div className="relative group">
        <div className="relative bg-background rounded-2xl p-6 space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Code2 className="w-5 h-5 text-green-500" />
            Quick Example
          </h3>

          <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded-xl overflow-x-auto text-xs">
{`<article>
  <header>
    <h1>My Blog Post</h1>
    <p>Published on <time datetime="2024-01-15">Jan 15, 2024</time></p>
  </header>

  <p>Content of my blog post.</p>

  <footer>
    <a href="#comments">Comments</a>
  </footer>
</article>`}
          </pre>

          <div className="flex items-start gap-2 text-sm">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
            <p className="text-muted-foreground">
              Uses semantic tags (article, header, time) for better structure and SEO.
            </p>
          </div>
        </div>
      </div>

      {/* Why Learn HTML */}
      <div className="border border-orange-500/30 rounded-lg p-6 bg-orange-500/5">
        <h3 className="text-xl font-bold mb-4">✅ Why Learn HTML?</h3>

        <div className="space-y-2 text-sm">
          <p>• Foundation of the Web</p>
          <p>• Easy to Learn</p>
          <p>• Career Essential</p>
          <p>• SEO Friendly</p>
        </div>
      </div>
    </div>
  );
};

export default HtmlOverview;


// import { Link } from 'react-router-dom';
// import { Code2, Lightbulb, Rocket, BookOpen, ArrowRight, Sparkles, Zap, CheckCircle } from 'lucide-react';
// import { useState } from 'react';

// const HtmlOverview = () => {
//   const [hoveredCard, setHoveredCard] = useState<number | null>(null);
//   const [activeTab, setActiveTab] = useState('old');

//   return (
//     <div className="animate-fade-in max-w-6xl mx-auto space-y-8">
//       {/* Hero */}
//       <div className="text-center space-y-4 py-8">
//         <div className="text-6xl mb-4">🌐</div>
//         <h1 className="text-4xl font-bold">
//           HTML <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Fundamentals</span>
//         </h1>
//         <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//           The foundation of every website - Learn the building blocks of the web
//         </p>
//       </div>

//       {/* What is HTML - Gradient Card */}
//       <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500">
//         <div className="absolute inset-0 bg-black/40"></div>
//         <div className="relative z-10 text-white">
//           <div className="flex items-center gap-3 mb-4">
//             <Lightbulb className="w-8 h-8" />
//             <h2 className="text-2xl font-bold">What is HTML?</h2>
//           </div>
//           <p className="mb-6 text-white/90 leading-relaxed">
//             HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure and content of a webpage using elements and tags.
//           </p>
//           <div className="grid md:grid-cols-3 gap-4">
//             <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center">
//               <div className="text-3xl mb-2">📄</div>
//               <div className="font-semibold">Structure</div>
//               <div className="text-sm text-white/80">Page layout</div>
//             </div>
//             <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center">
//               <div className="text-3xl mb-2">🏷️</div>
//               <div className="font-semibold">Tags</div>
//               <div className="text-sm text-white/80">Elements markup</div>
//             </div>
//             <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl text-center">
//               <div className="text-3xl mb-2">🔗</div>
//               <div className="font-semibold">Semantic</div>
//               <div className="text-sm text-white/80">Meaningful code</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Basic Structure - Split View */}
//       <div className="grid md:grid-cols-2 gap-6">
//         <div className="space-y-4">
//           <h3 className="text-2xl font-bold">📋 Basic Structure</h3>
//           <p className="text-muted-foreground">Every HTML document follows this template. The DOCTYPE declares HTML5, head contains metadata, and body holds visible content.</p>
//           <div className="space-y-2">
//             <div className="flex items-center gap-2 text-sm">
//               <div className="w-2 h-2 rounded-full bg-orange-500"></div>
//               <span className="font-mono text-orange-500">&lt;!DOCTYPE html&gt;</span>
//               <span className="text-muted-foreground">- HTML5 declaration</span>
//             </div>
//             <div className="flex items-center gap-2 text-sm">
//               <div className="w-2 h-2 rounded-full bg-blue-500"></div>
//               <span className="font-mono text-blue-500">&lt;head&gt;</span>
//               <span className="text-muted-foreground">- Metadata section</span>
//             </div>
//             <div className="flex items-center gap-2 text-sm">
//               <div className="w-2 h-2 rounded-full bg-green-500"></div>
//               <span className="font-mono text-green-500">&lt;body&gt;</span>
//               <span className="text-muted-foreground">- Visible content</span>
//             </div>
//           </div>
//         </div>
//         <div className="relative group">
//           <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition"></div>
//           <pre className="relative bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded-lg overflow-x-auto text-sm">
// {`<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <title>My Page</title>
// </head>
// <body>
//   <h1>Hello World!</h1>
// </body>
// </html>`}
//           </pre>
//         </div>
//       </div>

//       {/* Key Concepts - Floating Cards */}
//       <div className="relative py-8">
//         <h2 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-2">
//           <BookOpen className="w-6 h-6 text-orange-500" />
//           Key Concepts
//         </h2>
//         <div className="grid md:grid-cols-2 gap-6">
//           {[
//             { icon: '🏷️', title: 'Elements & Tags', desc: 'HTML uses tags like <div>, <p>, <h1> to define elements', color: 'from-orange-500 to-red-500' },
//             { icon: '🎯', title: 'Attributes', desc: 'Tags have attributes like class, id, src to add properties', color: 'from-blue-500 to-cyan-500' },
//             { icon: '🌳', title: 'DOM Tree', desc: 'HTML creates a tree structure of nested elements', color: 'from-green-500 to-emerald-500' },
//             { icon: '♿', title: 'Accessibility', desc: 'Semantic HTML makes sites accessible to everyone', color: 'from-purple-500 to-pink-500' }
//           ].map((item, i) => (
//             <div
//               key={i}
//               className="group relative"
//             >
//               <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
//               <div className="relative bg-background p-6 rounded-2xl">
//                 <div className="text-4xl mb-3">{item.icon}</div>
//                 <h3 className="font-bold text-lg mb-2">{item.title}</h3>
//                 <p className="text-sm text-muted-foreground">{item.desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Topics */}
//       <div className="space-y-4">
//         <h2 className="text-2xl font-bold flex items-center gap-2">
//           <Rocket className="w-6 h-6 text-orange-500" />
//           Explore HTML Topics
//         </h2>
//         <div className="grid md:grid-cols-2 gap-4">
//           {[
//             { title: 'Semantic HTML', route: '/html/semantic/', desc: 'Meaningful tags for better structure', icon: '📝' },
//             { title: 'HTML5 Features', route: '/html/html5-features/', desc: 'Modern HTML capabilities', icon: '🚀' },
//             { title: 'Forms', route: '/html/forms/', desc: 'User input and validation', icon: '📋' },
//             { title: 'Tables', route: '/html/tables/', desc: 'Tabular data display', icon: '📊' },
//             { title: 'Meta Tags', route: '/html/meta-tags/', desc: 'SEO and metadata', icon: '🏷️' },
//             { title: 'Web APIs', route: '/html/web-apis/', desc: 'Browser APIs and features', icon: '🔌' }
//           ].map((topic) => (
//             <Link
//               key={topic.route}
//               to={topic.route}
//               className="border border-border rounded-lg p-4 hover:border-orange-500 hover:shadow-lg transition-all group"
//             >
//               <div className="flex items-start gap-3">
//                 <div className="text-3xl">{topic.icon}</div>
//                 <div className="flex-1">
//                   <h3 className="font-bold mb-1 group-hover:text-orange-500 transition-colors">{topic.title}</h3>
//                   <p className="text-sm text-muted-foreground">{topic.desc}</p>
//                 </div>
//                 <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* Common HTML Elements - Masonry Grid */}
//       <div className="space-y-6">
//         <h3 className="text-2xl font-bold flex items-center gap-2">
//           <Sparkles className="w-6 h-6 text-orange-500" />
//           Common HTML Elements
//         </h3>
//         <div className="grid md:grid-cols-3 gap-4">
//           {[
//             { tag: '<h1> - <h6>', desc: 'Headings' },
//             { tag: '<p>', desc: 'Paragraph' },
//             { tag: '<a>', desc: 'Link' },
//             { tag: '<img>', desc: 'Image' },
//             { tag: '<div>', desc: 'Container' },
//             { tag: '<span>', desc: 'Inline' },
//             { tag: '<ul> / <ol>', desc: 'Lists' },
//             { tag: '<button>', desc: 'Button' },
//             { tag: '<input>', desc: 'Form input' }
//           ].map((item, i) => (
//             <div
//               key={i}
//               onMouseEnter={() => setHoveredCard(i)}
//               onMouseLeave={() => setHoveredCard(null)}
//               className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 p-5 rounded-xl transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-105"
//             >
//               <div className="font-mono text-lg font-bold mb-1 text-orange-500">
//                 {item.tag}
//               </div>
//               <div className="text-sm text-muted-foreground">{item.desc}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* HTML Best Practices - Timeline */}
//       <div className="relative">
//         <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
//           <Zap className="w-6 h-6 text-green-500" />
//           HTML Best Practices
//         </h2>
//         <div className="relative space-y-6 before:absolute before:left-4 before:top-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-green-500 before:to-emerald-500">
//           {[
//             { title: 'Use Semantic Tags', desc: 'Use <header>, <nav>, <main> instead of generic <div>' },
//             { title: 'Add Alt Text', desc: 'Always include alt attributes for images' },
//             { title: 'Proper Nesting', desc: 'Close tags in correct order, maintain hierarchy' },
//             { title: 'Validate HTML', desc: 'Use W3C validator to check for errors' },
//             { title: 'Minimize Inline Styles', desc: 'Use CSS files instead of style attributes' },
//             { title: 'Accessibility First', desc: 'Use ARIA labels, proper heading hierarchy' }
//           ].map((item, i) => (
//             <div key={i} className="relative pl-12 group">
//               <div className="absolute left-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold group-hover:scale-125 transition-transform">
//                 {i + 1}
//               </div>
//               <div className="bg-gradient-to-r from-green-500/10 to-transparent p-4 rounded-r-xl group-hover:from-green-500/20 transition-colors">
//                 <div className="font-semibold mb-1">{item.title}</div>
//                 <div className="text-sm text-muted-foreground">{item.desc}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* HTML vs HTML5 - Tab Switcher */}
//       <div className="border border-border rounded-lg overflow-hidden">
//         <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 border-b border-border">
//           <h3 className="text-xl font-bold">🆚 HTML vs HTML5</h3>
//         </div>
//         <div className="p-6">
//           <div className="flex gap-2 mb-6">
//             <button
//               onClick={() => setActiveTab('old')}
//               className={activeTab === 'old' ? 'flex-1 px-4 py-3 rounded-lg font-semibold transition-all bg-red-500 text-white shadow-lg scale-105' : 'flex-1 px-4 py-3 rounded-lg font-semibold transition-all bg-secondary text-muted-foreground hover:bg-secondary/80'}
//             >
//               Old HTML
//             </button>
//             <button
//               onClick={() => setActiveTab('html5')}
//               className={activeTab === 'html5' ? 'flex-1 px-4 py-3 rounded-lg font-semibold transition-all bg-green-500 text-white shadow-lg scale-105' : 'flex-1 px-4 py-3 rounded-lg font-semibold transition-all bg-secondary text-muted-foreground hover:bg-secondary/80'}
//             >
//               HTML5
//             </button>
//           </div>
          
//           <div className="animate-fade-in">
//             {activeTab === 'old' ? (
//               <div className="space-y-3 p-4 bg-red-500/5 rounded-lg border border-red-500/20">
//                 {[
//                   'Used <div> for everything',
//                   'No native video/audio',
//                   'Required Flash plugins',
//                   'Limited form inputs'
//                 ].map((item, i) => (
//                   <div key={i} className="flex items-center gap-2 text-sm">
//                     <span className="text-red-500">✗</span>
//                     <span>{item}</span>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="space-y-3 p-4 bg-green-500/5 rounded-lg border border-green-500/20">
//                 {[
//                   'Semantic tags (<header>, <nav>)',
//                   'Native <video> and <audio>',
//                   'Canvas, SVG support',
//                   'New inputs (date, email, range)'
//                 ].map((item, i) => (
//                   <div key={i} className="flex items-center gap-2 text-sm">
//                     <span className="text-green-500">✓</span>
//                     <span>{item}</span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Quick Example - Spotlight */}
//       <div className="relative group">
//         <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl blur-xl opacity-25 group-hover:opacity-75 transition duration-500"></div>
//         <div className="relative bg-background rounded-2xl p-6 space-y-4">
//           <div className="flex items-center justify-between">
//             <h3 className="text-xl font-bold flex items-center gap-2">
//               <Code2 className="w-5 h-5 text-green-500" />
//               Quick Example
//             </h3>
//             <span className="px-3 py-1 bg-green-500 text-white text-xs rounded-full">Semantic HTML</span>
//           </div>
//           <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-4 rounded-xl overflow-x-auto text-xs">
// {`<article>
//   <header>
//     <h1>My Blog Post</h1>
//     <p>Published on <time datetime="2024-01-15">Jan 15, 2024</time></p>
//   </header>
//   <p>Content of my blog post.</p>
//   <footer>
//     <a href="#comments">Comments</a>
//   </footer>
// </article>`}
//           </pre>
//           <div className="flex items-start gap-2 text-sm">
//             <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
//             <p className="text-muted-foreground">
//               Uses semantic tags (article, header, time) for better structure and SEO
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Why Learn HTML */}
//       <div className="border border-orange-500/30 rounded-lg p-6 bg-orange-500/5">
//         <h3 className="text-xl font-bold mb-4">✅ Why Learn HTML?</h3>
//         <div className="space-y-2 text-sm">
//           <div className="flex items-start gap-2">
//             <span className="text-orange-500">•</span>
//             <span><strong>Foundation of Web</strong> - Every website uses HTML</span>
//           </div>
//           <div className="flex items-start gap-2">
//             <span className="text-orange-500">•</span>
//             <span><strong>Easy to Learn</strong> - Simple syntax, quick to master</span>
//           </div>
//           <div className="flex items-start gap-2">
//             <span className="text-orange-500">•</span>
//             <span><strong>Career Essential</strong> - Required for all web developers</span>
//           </div>
//           <div className="flex items-start gap-2">
//             <span className="text-orange-500">•</span>
//             <span><strong>SEO Friendly</strong> - Proper HTML improves search rankings</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HtmlOverview;
