const AiSeo = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">AI & SEO</h1>
        <p className="text-lg text-muted-foreground">Optimize for AI-powered search engines</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🤖 AI Search Engines</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-4 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">ChatGPT Search</h3>
            <p className="text-sm text-muted-foreground">AI-powered conversational search with real-time web access</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 p-4 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">Google SGE</h3>
            <p className="text-sm text-muted-foreground">Search Generative Experience with AI-generated answers</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-4 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">Bing Copilot</h3>
            <p className="text-sm text-muted-foreground">Microsoft's AI-powered search assistant</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 p-4 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">Perplexity AI</h3>
            <p className="text-sm text-muted-foreground">AI search engine with cited sources</p>
          </div>
        </div>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📝 Optimizing for AI</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-foreground mb-2">1. Clear, Concise Content</h3>
            <p className="text-sm text-muted-foreground">AI prefers well-structured, easy-to-understand content with direct answers</p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-foreground mb-2">2. Structured Data</h3>
            <p className="text-sm text-muted-foreground">Use Schema.org markup to help AI understand your content context</p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-foreground mb-2">3. Answer Questions Directly</h3>
            <p className="text-sm text-muted-foreground">Format content as Q&A, use FAQ schema, provide immediate answers</p>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-foreground mb-2">4. Authoritative Sources</h3>
            <p className="text-sm text-muted-foreground">Build E-E-A-T (Experience, Expertise, Authoritativeness, Trust)</p>
          </div>
        </div>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🎯 AI Content Strategy</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`<!-- FAQ Schema for AI -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What is AI SEO?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "AI SEO is optimizing content for AI-powered search engines..."
    }
  }]
}
</script>

<!-- Clear Answer Format -->
<div class="answer-box">
  <h2>Quick Answer</h2>
  <p>Direct, concise answer here...</p>
</div>`}</code></pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• AI search engines prioritize clear, direct answers</li>
          <li>• Structured data helps AI understand content</li>
          <li>• Focus on E-E-A-T and authoritative content</li>
          <li>• Optimize for conversational queries</li>
        </ul>
      </div>
    </div>
  );
};

export default AiSeo;
