const LocalSeo = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-foreground mb-3">Local SEO</h1>
        <p className="text-lg text-muted-foreground">Optimize for local search and Google Maps</p>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📍 Google Business Profile</h2>
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-4 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">Essential Information</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ Business name, address, phone (NAP)</li>
              <li>✓ Business hours & special hours</li>
              <li>✓ Business category & attributes</li>
              <li>✓ Website URL & booking links</li>
              <li>✓ High-quality photos & videos</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🎯 Local Ranking Factors</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-4 rounded-lg border border-border">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold text-foreground mb-2">Relevance</h3>
            <p className="text-sm text-muted-foreground">How well your business matches the search query</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-4 rounded-lg border border-border">
            <div className="text-3xl mb-2">📍</div>
            <h3 className="font-semibold text-foreground mb-2">Distance</h3>
            <p className="text-sm text-muted-foreground">How far your business is from the searcher</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 p-4 rounded-lg border border-border">
            <div className="text-3xl mb-2">⭐</div>
            <h3 className="font-semibold text-foreground mb-2">Prominence</h3>
            <p className="text-sm text-muted-foreground">How well-known your business is (reviews, links)</p>
          </div>
        </div>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">⭐ Reviews & Ratings</h2>
        <div className="space-y-3">
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-foreground mb-2">Get More Reviews</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Ask customers after positive experiences</li>
              <li>• Send follow-up emails with review links</li>
              <li>• Make it easy with QR codes or short links</li>
              <li>• Respond to all reviews (positive & negative)</li>
            </ul>
          </div>
          <div className="border-l-4 border-primary pl-4">
            <h3 className="font-semibold text-foreground mb-2">Review Response Template</h3>
            <pre className="bg-secondary/50 p-3 rounded text-sm overflow-x-auto"><code>{`Positive: "Thank you [Name]! We're thrilled you enjoyed [specific detail]. 
Looking forward to serving you again!"

Negative: "We're sorry to hear about your experience, [Name]. 
We'd like to make this right. Please contact us at [phone/email]."`}</code></pre>
          </div>
        </div>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">🗺️ Local Citations</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-background/50 p-4 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">Major Directories</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Google Business Profile</li>
              <li>• Bing Places</li>
              <li>• Apple Maps</li>
              <li>• Yelp</li>
              <li>• Facebook Business</li>
            </ul>
          </div>
          <div className="bg-background/50 p-4 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">Industry-Specific</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• TripAdvisor (hospitality)</li>
              <li>• Healthgrades (healthcare)</li>
              <li>• Avvo (legal)</li>
              <li>• Houzz (home services)</li>
              <li>• OpenTable (restaurants)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="topic-card p-6 mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">📝 Local Content Strategy</h2>
        <pre className="bg-secondary/50 p-4 rounded-lg overflow-x-auto"><code>{`<!-- Location Pages -->
<h1>Plumber in [City Name]</h1>
<p>Serving [City] and surrounding areas since [Year]</p>

<!-- Local Keywords -->
- [Service] in [City]
- [City] [Service] near me
- Best [Service] [Neighborhood]

<!-- Local Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Your Business",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "12345"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "40.7128",
    "longitude": "-74.0060"
  }
}
</script>`}</code></pre>
      </div>

      <div className="topic-card p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <h2 className="text-xl font-bold text-foreground mb-3">🎓 Key Takeaways</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Optimize Google Business Profile completely</li>
          <li>• Get consistent NAP across all directories</li>
          <li>• Actively collect and respond to reviews</li>
          <li>• Create location-specific content and pages</li>
        </ul>
      </div>
    </div>
  );
};

export default LocalSeo;
