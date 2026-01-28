const ContentMarketing = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Content Marketing & SEO</h1>
        <p className="text-lg text-muted-foreground">Create content that ranks and converts</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📝 Content Types</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-4 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">Blog Posts</h3>
            <p className="text-sm text-muted-foreground">Educational, how-to, listicles, case studies</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-4 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">Video Content</h3>
            <p className="text-sm text-muted-foreground">Tutorials, product demos, interviews</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-4 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">Infographics</h3>
            <p className="text-sm text-muted-foreground">Visual data, statistics, processes</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 p-4 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">Guides & Ebooks</h3>
            <p className="text-sm text-muted-foreground">Comprehensive resources, lead magnets</p>
          </div>
        </div>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🎯 Content Strategy Framework</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-foreground mb-2">1. Research & Planning</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Keyword research (search volume, difficulty)</li>
              <li>• Competitor analysis (content gaps)</li>
              <li>• User intent (informational, transactional)</li>
              <li>• Content calendar planning</li>
            </ul>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-foreground mb-2">2. Content Creation</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Write for humans first, search engines second</li>
              <li>• Use clear headings (H1, H2, H3)</li>
              <li>• Include images, videos, examples</li>
              <li>• Add internal and external links</li>
            </ul>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-foreground mb-2">3. Optimization</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Optimize title tags and meta descriptions</li>
              <li>• Use target keywords naturally</li>
              <li>• Add schema markup</li>
              <li>• Optimize images (alt text, compression)</li>
            </ul>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-foreground mb-2">4. Promotion & Distribution</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Share on social media</li>
              <li>• Email newsletter</li>
              <li>• Outreach for backlinks</li>
              <li>• Repurpose content (video → blog → social)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📊 Content Performance Metrics</h2>
        <div className="grid md:grid-cols-3 gap-3">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-3 rounded-lg border border-border">
            <div className="text-2xl font-bold text-primary mb-1">Organic Traffic</div>
            <p className="text-xs text-muted-foreground">Visitors from search engines</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-3 rounded-lg border border-border">
            <div className="text-2xl font-bold text-primary mb-1">Engagement</div>
            <p className="text-xs text-muted-foreground">Time on page, bounce rate</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-3 rounded-lg border border-border">
            <div className="text-2xl font-bold text-primary mb-1">Conversions</div>
            <p className="text-xs text-muted-foreground">Leads, sales, sign-ups</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 p-3 rounded-lg border border-border">
            <div className="text-2xl font-bold text-primary mb-1">Backlinks</div>
            <p className="text-xs text-muted-foreground">Quality links earned</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-3 rounded-lg border border-border">
            <div className="text-2xl font-bold text-primary mb-1">Rankings</div>
            <p className="text-xs text-muted-foreground">Keyword positions</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-3 rounded-lg border border-border">
            <div className="text-2xl font-bold text-primary mb-1">Social Shares</div>
            <p className="text-xs text-muted-foreground">Virality & reach</p>
          </div>
        </div>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">✍️ SEO Content Template</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`<!-- Article Structure -->
<article>
  <h1>Main Keyword: Complete Guide [Year]</h1>
  
  <!-- Table of Contents -->
  <nav>
    <ul>
      <li><a href="#section1">What is [Topic]?</a></li>
      <li><a href="#section2">How to [Action]</a></li>
      <li><a href="#section3">Best Practices</a></li>
    </ul>
  </nav>
  
  <!-- Introduction (100-150 words) -->
  <p>Hook + Problem + Solution + What reader will learn</p>
  
  <!-- Main Content -->
  <h2 id="section1">What is [Topic]?</h2>
  <p>Clear definition with examples...</p>
  
  <h2 id="section2">How to [Action]</h2>
  <ol>
    <li>Step 1 with details</li>
    <li>Step 2 with details</li>
  </ol>
  
  <!-- Conclusion -->
  <h2>Conclusion</h2>
  <p>Summary + Call to action</p>
  
  <!-- FAQ Schema -->
  <div itemscope itemtype="https://schema.org/FAQPage">
    <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
      <h3 itemprop="name">Common Question?</h3>
      <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
        <p itemprop="text">Answer here...</p>
      </div>
    </div>
  </div>
</article>`}</code></pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Quality content is the foundation of SEO</li>
          <li>• Match content to user search intent</li>
          <li>• Optimize for both users and search engines</li>
          <li>• Promote and update content regularly</li>
        </ul>
      </div>
    </div>
  );
};

export default ContentMarketing;
