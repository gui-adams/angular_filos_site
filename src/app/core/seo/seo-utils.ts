import { Meta, Title } from '@angular/platform-browser';

export type SeoPayload = {
  title: string;
  description: string;
  canonical: string;
  image?: string;
  robots?: string;
};

export function applySeo(titleSrv: Title, meta: Meta, payload: SeoPayload) {
  titleSrv.setTitle(payload.title);

  meta.updateTag({ name: 'description', content: payload.description });
  meta.updateTag({ name: 'robots', content: payload.robots ?? 'index,follow' });

  // Open Graph
  meta.updateTag({ property: 'og:title', content: payload.title });
  meta.updateTag({ property: 'og:description', content: payload.description });
  meta.updateTag({ property: 'og:url', content: payload.canonical });
  meta.updateTag({ property: 'og:type', content: 'website' });
  if (payload.image) meta.updateTag({ property: 'og:image', content: payload.image });

  // Twitter
  meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  meta.updateTag({ name: 'twitter:title', content: payload.title });
  meta.updateTag({ name: 'twitter:description', content: payload.description });
  if (payload.image) meta.updateTag({ name: 'twitter:image', content: payload.image });
}

export function setCanonical(canonicalUrl: string) {
  let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', canonicalUrl);
}

export function setJsonLd(schema: unknown, id = 'jsonld-course') {
  const existing = document.getElementById(id);
  if (existing) existing.remove();

  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
}