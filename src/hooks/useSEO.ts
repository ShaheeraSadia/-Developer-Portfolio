import { useEffect } from 'react';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath?: string;
}

/**
 * Updates document title, standard meta description, keywords, and OpenGraph/Twitter tags
 */
export function updateDocumentSEO({ title, description, keywords, canonicalPath }: SEOProps): void {
  // Format Title
  const formattedTitle = title.includes('Shaheera Sadia')
    ? title
    : `${title} | Shaheera Sadia — Front-End Developer`;

  document.title = formattedTitle;

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
  if (keywords && keywords.length > 0) {
    setMeta('name', 'keywords', keywords.join(', '));
  }

  // Open Graph Social Tags
  setMeta('property', 'og:title', formattedTitle);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:type', 'website');

  // Twitter Cards
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', formattedTitle);
  setMeta('name', 'twitter:description', description);

  // Canonical Link
  if (canonicalPath) {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    canonical.setAttribute('href', `${origin}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`);
  }
}

/**
 * React Hook to dynamically synchronize document title and meta description
 */
export function useSEO({ title, description, keywords, canonicalPath }: SEOProps): void {
  useEffect(() => {
    updateDocumentSEO({ title, description, keywords, canonicalPath });
  }, [title, description, keywords, canonicalPath]);
}
