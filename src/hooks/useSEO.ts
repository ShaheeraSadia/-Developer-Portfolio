import { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath?: string;
  ogImage?: string;
}

/**
 * Updates document title, standard meta description, keywords, and OpenGraph/Twitter tags
 */
export function updateDocumentSEO({ title, description, keywords, canonicalPath, ogImage }: SEOProps): void {
  // Format Title consistently
  const formattedTitle = title.includes('Shaheera Sadia')
    ? title
    : `${title} | Shaheera Sadia — Front-End Developer`;

  document.title = formattedTitle;

  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://shaheera-sadia.vercel.app';
  const defaultImage = `${origin}/og-image.png`;
  const resolvedImage = ogImage ? (ogImage.startsWith('http') ? ogImage : `${origin}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`) : defaultImage;
  const resolvedUrl = canonicalPath ? `${origin}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}` : `${origin}/`;

  // Helper to find or create a meta tag
  const setMeta = (attrName: 'name' | 'property', attrValue: string, content: string) => {
    let el = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Standard Meta Tags
  setMeta('name', 'description', description);
  setMeta('name', 'theme-color', '#0a0d12');
  if (keywords && keywords.length > 0) {
    setMeta('name', 'keywords', keywords.join(', '));
  }

  // Open Graph Social Tags
  setMeta('property', 'og:type', 'website');
  setMeta('property', 'og:site_name', 'Shaheera Sadia Portfolio');
  setMeta('property', 'og:title', formattedTitle);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url', resolvedUrl);
  setMeta('property', 'og:image', resolvedImage);
  setMeta('property', 'og:image:width', '1200');
  setMeta('property', 'og:image:height', '630');
  setMeta('property', 'og:image:alt', 'Shaheera Sadia — Front-End Developer Portfolio');

  // Twitter Cards
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', formattedTitle);
  setMeta('name', 'twitter:description', description);
  setMeta('name', 'twitter:image', resolvedImage);

  // Canonical Link
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', resolvedUrl);
}

/**
 * React Hook to dynamically synchronize document title and meta description
 */
export function useSEO({ title, description, keywords, canonicalPath, ogImage }: SEOProps): void {
  useEffect(() => {
    updateDocumentSEO({ title, description, keywords, canonicalPath, ogImage });
  }, [title, description, keywords, canonicalPath, ogImage]);
}

