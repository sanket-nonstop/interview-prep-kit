import { TopicLayout } from '@/components/TopicLayout';

const metaTagsCode = `<!-- Meta Tags & SEO: Optimize for search engines and social media -->

<!DOCTYPE html>
<html lang="en">
<head>
  <!-- ✅ Essential meta tags -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Frontend Interview Practice | Master React, JavaScript & CSS</title>
  <meta name="description" content="Comprehensive frontend interview preparation with React hooks, JavaScript concepts, CSS layouts, and Next.js patterns. Practice with real-world examples.">
  
  <!-- ✅ Open Graph (Facebook, LinkedIn) -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Frontend Interview Practice System">
  <meta property="og:description" content="Master frontend interviews with hands-on practice in React, JavaScript, CSS, and Next.js">
  <meta property="og:image" content="https://example.com/og-image.jpg">
  <meta property="og:url" content="https://example.com">
  <meta property="og:site_name" content="Interview Ready">
  
  <!-- ✅ Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Frontend Interview Practice System">
  <meta name="twitter:description" content="Master frontend interviews with hands-on practice">
  <meta name="twitter:image" content="https://example.com/twitter-image.jpg">
  <meta name="twitter:creator" content="@yourhandle">
  
  <!-- ✅ SEO optimization -->
  <meta name="keywords" content="frontend interview, react hooks, javascript, css grid, next.js">
  <meta name="author" content="Your Name">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://example.com/current-page">
  
  <!-- ✅ Performance & Security -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="dns-prefetch" href="https://api.example.com">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'">
  
  <!-- ✅ Favicon and app icons -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  
  <!-- ✅ Structured data (JSON-LD) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Frontend Interview Practice",
    "description": "Interactive learning platform for frontend development interviews",
    "url": "https://example.com",
    "sameAs": [
      "https://twitter.com/yourhandle",
      "https://github.com/yourusername"
    ]
  }
  </script>
</head>

<!-- ✅ React component for dynamic meta tags -->
import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image = '/default-og-image.jpg',
  url,
  type = 'website'
}) => {
  const siteTitle = 'Frontend Interview Practice';
  const fullTitle = title ? \`\${title} | \${siteTitle}\` : siteTitle;
  
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {url && <meta property="og:url" content={url} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      {url && <link rel="canonical" href={url} />}
    </Head>
  );
};

// Usage in pages
const ReactHooksPage = () => {
  return (
    <>
      <SEO
        title="React Hooks Guide"
        description="Master React hooks with useState, useEffect, useRef examples and best practices for frontend interviews."
        url="https://example.com/react/hooks"
      />
      <main>
        <h1>React Hooks</h1>
        {/* Page content */}
      </main>
    </>
  );
};`;

const MetaTags = () => {
  return (
    <TopicLayout
      title="Meta Tags & SEO"
      route="/html/meta-tags"
      category="html"
      explanation="Meta tags provide metadata about HTML documents for search engines, social media, and browsers. Include essential tags like title, description, Open Graph for social sharing, Twitter Cards, and structured data for better SEO and user experience."
      code={metaTagsCode}
      codeFilename="meta-tags.html"
      whyItMatters="SEO and social media optimization are crucial for web visibility. Interviewers test understanding of meta tags, structured data, and performance optimization. Essential for building discoverable, shareable web applications."
      mistakes={[
        "Missing viewport meta tag - breaks mobile responsiveness and SEO rankings.",
        "Duplicate or missing title/description tags - hurts search engine optimization.",
        "Not implementing Open Graph tags - poor social media sharing experience.",
        "Ignoring structured data - missing rich snippets and search features.",
      ]}
      practiceTask="Build a blog post page with complete SEO optimization: dynamic meta tags, Open Graph images, structured data for articles, and social media preview testing."
    />
  );
};

export default MetaTags;