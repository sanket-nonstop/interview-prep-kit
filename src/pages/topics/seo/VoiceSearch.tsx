const VoiceSearch = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Voice Search Optimization</h1>
        <p className="text-lg text-muted-foreground">Optimize for voice assistants and conversational search</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🎤 Voice Assistants</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-4 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">Google Assistant</h3>
            <p className="text-sm text-muted-foreground">Android, Google Home, Smart displays</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-4 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">Amazon Alexa</h3>
            <p className="text-sm text-muted-foreground">Echo devices, Fire TV, Third-party devices</p>
          </div>
          <div className="bg-gradient-to-br from-gray-500/10 to-slate-500/10 p-4 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">Apple Siri</h3>
            <p className="text-sm text-muted-foreground">iPhone, iPad, Mac, HomePod, Apple Watch</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 p-4 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">Microsoft Cortana</h3>
            <p className="text-sm text-muted-foreground">Windows, Microsoft 365</p>
          </div>
        </div>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📝 Voice Search Characteristics</h2>
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="text-3xl">🗣️</div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Conversational Queries</h3>
              <p className="text-sm text-muted-foreground">People speak naturally: "What's the best pizza place near me?"</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="text-3xl">❓</div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Question-Based</h3>
              <p className="text-sm text-muted-foreground">Who, What, Where, When, Why, How questions dominate</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="text-3xl">📍</div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Local Intent</h3>
              <p className="text-sm text-muted-foreground">"Near me" searches are 3x more common in voice</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="text-3xl">⚡</div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Longer Queries</h3>
              <p className="text-sm text-muted-foreground">Voice searches average 29 words vs 3 words typed</p>
            </div>
          </div>
        </div>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🎯 Optimization Strategies</h2>
        <div className="space-y-3">
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-foreground mb-2">1. Use Natural Language</h3>
            <pre className="bg-secondary/50 p-3 rounded text-sm overflow-x-auto"><code>{`❌ "best restaurants NYC"
✅ "What are the best restaurants in New York City?"`}</code></pre>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-foreground mb-2">2. Create FAQ Pages</h3>
            <pre className="bg-secondary/50 p-3 rounded text-sm overflow-x-auto"><code>{`<h2>How do I reset my password?</h2>
<p>To reset your password, click on "Forgot Password"...</p>`}</code></pre>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-foreground mb-2">3. Optimize for Featured Snippets</h3>
            <pre className="bg-secondary/50 p-3 rounded text-sm overflow-x-auto"><code>{`<div class="answer-box">
  <h3>Quick Answer</h3>
  <p>Direct answer in 40-60 words...</p>
</div>`}</code></pre>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-foreground mb-2">4. Local SEO</h3>
            <pre className="bg-secondary/50 p-3 rounded text-sm overflow-x-auto"><code>{`Google My Business
+ NAP (Name, Address, Phone)
+ Local keywords
+ Customer reviews`}</code></pre>
          </div>
        </div>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Voice searches are conversational and question-based</li>
          <li>• Optimize for featured snippets and position zero</li>
          <li>• Focus on local SEO for "near me" queries</li>
          <li>• Use natural language and long-tail keywords</li>
        </ul>
      </div>
    </div>
  );
};

export default VoiceSearch;
