import { TopicLayout } from '@/components/TopicLayout';

const metadataCode = `// Next.js Metadata & SEO: App Router metadata API

// ✅ Static metadata in layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Interview Practice',
    default: 'Interview Practice'
  },
  description: 'Master interviews with React, JavaScript, CSS, and Next.js',
  keywords: ['frontend', 'interview', 'react', 'javascript', 'css'],
  authors: [{ name: 'Your Name', url: 'https://yoursite.com' }],
  creator: 'Your Name',
  publisher: 'Your Company',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yoursite.com',
    siteName: 'Interview Practice',
    title: 'Interview Practice System',
    description: 'Master frontend interviews with hands-on practice',
    images: [
      {
        url: 'https://yoursite.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Interview Practice',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interview Practice',
    description: 'Master frontend interviews with hands-on practice',
    creator: '@yourhandle',
    images: ['https://yoursite.com/twitter-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

// ✅ Dynamic metadata in page.tsx
// app/blog/[slug]/page.tsx
interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await fetch(\`https://api.example.com/posts/\${params.slug}\`)
    .then(res => res.json());
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  };
}

// ✅ JSON-LD structured data
// app/blog/[slug]/page.tsx
export default async function BlogPost({ params }: Props) {
  const post = await getPost(params.slug);
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: post.author.website,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Your Site Name',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yoursite.com/logo.png',
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': \`https://yoursite.com/blog/\${params.slug}\`,
    },
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </article>
    </>
  );
}

// ✅ Sitemap generation
// app/sitemap.ts
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetch('https://api.example.com/posts')
    .then(res => res.json());
  
  const postUrls = posts.map((post: any) => ({
    url: \`https://yoursite.com/blog/\${post.slug}\`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  
  return [
    {
      url: 'https://yoursite.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://yoursite.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://yoursite.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...postUrls,
  ];
}

// ✅ Robots.txt generation
// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/'],
    },
    sitemap: 'https://yoursite.com/sitemap.xml',
  };
}

// ✅ Custom metadata component
const CustomMetadata: React.FC<{
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
}> = ({ title, description, image, noIndex = false }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      
      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Head>
  );
};

// ✅ SEO optimization checklist
/*
1. ✅ Unique titles and descriptions for each page
2. ✅ Proper heading hierarchy (h1, h2, h3)
3. ✅ Alt text for all images
4. ✅ Internal linking structure
5. ✅ Mobile-friendly responsive design
6. ✅ Fast loading times (Core Web Vitals)
7. ✅ HTTPS enabled
8. ✅ Structured data markup
9. ✅ XML sitemap
10. ✅ Robots.txt file
*/`;

const Metadata = () => {
  return (
    <TopicLayout
      title="Metadata & SEO"
      route="/nextjs/metadata"
      category="nextjs"
      explanation="Next.js App Router provides a powerful Metadata API for SEO optimization. Define static metadata in layouts, generate dynamic metadata in pages, create sitemaps and robots.txt files, and implement structured data for rich search results."
      code={metadataCode}
      codeFilename="metadata.tsx"
      whyItMatters="SEO is crucial for web visibility and user acquisition. Interviewers test understanding of metadata best practices, structured data, and Next.js SEO features. Essential for building discoverable, search-engine-friendly applications."
      mistakes={[
        "Not providing unique titles and descriptions for each page - hurts SEO rankings.",
        "Missing Open Graph and Twitter Card metadata - poor social media sharing.",
        "Not implementing structured data - missing rich snippets in search results.",
        "Forgetting to generate sitemap.xml and robots.txt - reduces search engine crawling efficiency.",
      ]}
      practiceTask="Build a blog with dynamic metadata generation, implement structured data for articles, create automated sitemap generation, and optimize for Core Web Vitals and social media sharing."
    />
  );
};

export default Metadata;