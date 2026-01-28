const SemPpc = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">SEM & PPC</h1>
        <p className="text-lg text-muted-foreground">Search Engine Marketing & Pay-Per-Click advertising</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🎯 SEO vs SEM</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 p-4 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">SEO (Organic)</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Free traffic</li>
              <li>• Long-term results</li>
              <li>• Takes time to rank</li>
              <li>• Builds authority</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-4 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">SEM (Paid)</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Paid traffic</li>
              <li>• Immediate results</li>
              <li>• Costs per click</li>
              <li>• Targeted campaigns</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">💰 PPC Platforms</h2>
        <div className="space-y-3">
          <div className="bg-background/50 p-3 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground">Google Ads</h3>
            <p className="text-sm text-muted-foreground">Search, Display, Shopping, Video, App campaigns</p>
          </div>
          <div className="bg-background/50 p-3 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground">Microsoft Advertising</h3>
            <p className="text-sm text-muted-foreground">Bing, Yahoo, AOL search network</p>
          </div>
          <div className="bg-background/50 p-3 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground">Social Media Ads</h3>
            <p className="text-sm text-muted-foreground">Facebook, Instagram, LinkedIn, Twitter ads</p>
          </div>
        </div>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📊 Key Metrics</h2>
        <div className="grid md:grid-cols-3 gap-3">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-3 rounded-lg border border-border">
            <div className="text-2xl font-bold text-primary mb-1">CPC</div>
            <p className="text-xs text-muted-foreground">Cost Per Click</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-3 rounded-lg border border-border">
            <div className="text-2xl font-bold text-primary mb-1">CTR</div>
            <p className="text-xs text-muted-foreground">Click-Through Rate</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-3 rounded-lg border border-border">
            <div className="text-2xl font-bold text-primary mb-1">ROAS</div>
            <p className="text-xs text-muted-foreground">Return on Ad Spend</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 p-3 rounded-lg border border-border">
            <div className="text-2xl font-bold text-primary mb-1">QS</div>
            <p className="text-xs text-muted-foreground">Quality Score</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-3 rounded-lg border border-border">
            <div className="text-2xl font-bold text-primary mb-1">CVR</div>
            <p className="text-xs text-muted-foreground">Conversion Rate</p>
          </div>
          <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-3 rounded-lg border border-border">
            <div className="text-2xl font-bold text-primary mb-1">CPA</div>
            <p className="text-xs text-muted-foreground">Cost Per Acquisition</p>
          </div>
        </div>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🎯 Campaign Structure</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`Campaign
├── Ad Group 1: "Running Shoes"
│   ├── Keywords: running shoes, best running shoes
│   ├── Ad 1: Headline + Description
│   └── Landing Page: /running-shoes
│
├── Ad Group 2: "Trail Running Shoes"
│   ├── Keywords: trail running shoes, hiking shoes
│   ├── Ad 2: Headline + Description
│   └── Landing Page: /trail-running-shoes
│
└── Budget: $50/day
    Bidding: Target CPA
    Location: United States`}</code></pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• SEM provides immediate visibility through paid ads</li>
          <li>• Quality Score affects ad cost and position</li>
          <li>• Track ROAS and CPA for campaign success</li>
          <li>• Combine SEO and SEM for best results</li>
        </ul>
      </div>
    </div>
  );
};

export default SemPpc;
