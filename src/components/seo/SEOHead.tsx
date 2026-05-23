import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  /** Inject one or more JSON-LD blocks (Organization, FAQPage, Product, etc.) */
  jsonLd?: Record<string, unknown>[];
}

/**
 * Lightweight head manager (no react-helmet dependency).
 *
 * Optimized for:
 *   - SEO: title, description, canonical, Open Graph, Twitter Card.
 *   - AEO (Answer Engine Optimization): FAQPage / HowTo / Organization
 *     JSON-LD so answer engines (Perplexity, Google AI Overviews, Bing
 *     Copilot) can pull verbatim Q&A pairs and entity facts.
 *   - GEO (Generative Engine Optimization): stable, citation-friendly
 *     structured data + descriptive meta so LLM crawlers attribute
 *     statements back to alive5.com.
 *
 * One <SEOHead> can be rendered per page; cleanup removes injected nodes
 * when the page unmounts so SPA navigation doesn't accumulate stale tags.
 */
export function SEOHead({ title, description, canonical, ogImage, jsonLd }: SEOHeadProps) {
  useEffect(() => {
    const cleanup: Array<() => void> = [];

    if (title) {
      const prevTitle = document.title;
      document.title = title;
      cleanup.push(() => {
        document.title = prevTitle;
      });
    }

    const upsertMeta = (selector: string, attrs: Record<string, string>) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      const created = !el;
      if (!el) {
        el = document.createElement('meta');
        Object.entries(attrs).forEach(([k, v]) => {
          if (k !== 'content') el!.setAttribute(k, v);
        });
        document.head.appendChild(el);
      }
      el.setAttribute('content', attrs.content);
      if (created) cleanup.push(() => el!.remove());
    };

    const upsertLink = (rel: string, href: string) => {
      let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      const created = !el;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
      if (created) cleanup.push(() => el!.remove());
    };

    if (description) {
      upsertMeta('meta[name="description"]', { name: 'description', content: description });
      upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
      upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    }
    if (title) {
      upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
      upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    }
    if (ogImage) {
      upsertMeta('meta[property="og:image"]', { property: 'og:image', content: ogImage });
      upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: ogImage });
    }
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: 'index,follow,max-image-preview:large' });

    if (canonical) {
      upsertLink('canonical', canonical);
      upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    }

    // Inject JSON-LD blocks
    const ldNodes: HTMLScriptElement[] = [];
    (jsonLd || []).forEach((block, i) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.dataset.seoIndex = String(i);
      s.text = JSON.stringify(block);
      document.head.appendChild(s);
      ldNodes.push(s);
    });
    cleanup.push(() => ldNodes.forEach((n) => n.remove()));

    return () => cleanup.forEach((fn) => fn());
  }, [title, description, canonical, ogImage, jsonLd]);

  return null;
}
