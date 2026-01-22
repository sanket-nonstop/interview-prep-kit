import { TopicLayout } from '@/components/TopicLayout';

const imageSeoCode = `// Image SEO: Optimization for search and performance

// ✅ Next.js Image component with SEO optimization
import Image from 'next/image';

export default function ArticlePage() {
  return (
    <article>
      <h1>JavaScript Closures Guide</h1>
      
      {/* Optimized image with proper alt text */}
      <Image
        src="/images/closures-diagram.png"
        alt="JavaScript closure scope chain diagram showing outer and inner function variables"
        width={800}
        height={600}
        priority // Load above-the-fold images first
        quality={85} // Balance quality vs file size
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
      />

      {/* Responsive images */}
      <Image
        src="/hero.jpg"
        alt="Frontend developer coding React application"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
      />
    </article>
  );
}

// ✅ Dynamic images with proper alt text
export default function ProductPage({ product }: { product: Product }) {
  return (
    <div>
      <Image
        src={product.image}
        alt={product.imageAlt || \`\${product.name} - \${product.category}\`}
        width={600}
        height={400}
      />
    </div>
  );
}

// ✅ Image formats and optimization
export default function OptimizedImages() {
  return (
    <div>
      {/* Next.js automatically serves WebP/AVIF when supported */}
      <Image
        src="/photo.jpg" // Automatically optimized
        alt="Team collaboration in modern office"
        width={1200}
        height={800}
      />

      {/* SVG for logos and icons */}
      <Image
        src="/logo.svg"
        alt="Company logo"
        width={200}
        height={50}
      />
    </div>
  );
}

// ✅ Lazy loading for below-the-fold images
export default function Gallery({ images }: { images: Image[] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((img, i) => (
        <Image
          key={i}
          src={img.url}
          alt={img.alt}
          width={400}
          height={300}
          loading={i < 6 ? 'eager' : 'lazy'} // First 6 eager, rest lazy
        />
      ))}
    </div>
  );
}

// ✅ Structured data for images
export default function ArticleWithImage({ article }: { article: Article }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    image: {
      '@type': 'ImageObject',
      url: article.image,
      width: 1200,
      height: 630,
      caption: article.imageCaption,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <Image src={article.image} alt={article.imageAlt} width={1200} height={630} />
      </article>
    </>
  );
}

// ❌ Bad practices
function BadImageSEO() {
  return (
    <div>
      <img src="/image.png" /> {/* ❌ No alt text */}
      <img src="/huge-image.jpg" alt="image" /> {/* ❌ Not optimized, generic alt */}
      <Image src="/photo.jpg" alt="photo" width={800} height={600} /> {/* ❌ Generic alt */}
    </div>
  );
}`;

const ImageSeo = () => {
  return (
    <TopicLayout
      title="Image SEO"
      route="/seo/on-page/image-seo"
      category="javascript"
      explanation="Image SEO: descriptive alt text for accessibility and search, optimized formats (WebP/AVIF), proper sizing, lazy loading. Next.js Image component handles optimization automatically. Alt text helps visually impaired users and appears when images fail to load."
      code={imageSeoCode}
      codeFilename="image-seo.tsx"
      whyItMatters="Images appear in Google Image Search and improve page rankings. Slow images hurt Core Web Vitals. Interviewers ask: 'How do you optimize images?', 'What's alt text for?', 'Next.js Image component benefits?' Shows performance awareness."
      mistakes={[
        "Missing alt text: Hurts accessibility and SEO. Every image needs descriptive alt.",
        "Generic alt: 'image', 'photo' provides no context. Describe what's in the image.",
        "Not using Next.js Image: Misses automatic optimization, lazy loading, WebP conversion.",
        "Huge file sizes: Unoptimized images slow page load, hurt Core Web Vitals.",
      ]}
      practiceTask="Audit your project images: add descriptive alt text to all images, convert <img> tags to Next.js Image component, ensure images are under 200KB, and implement lazy loading for below-the-fold images."
    />
  );
};

export default ImageSeo;