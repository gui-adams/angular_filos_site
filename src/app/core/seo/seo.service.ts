import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoConfig {
  title: string;
  description: string;
  canonicalUrl: string;
  image?: string;
  robots?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  private setCanonical(url: string) {
    let link = this.doc.querySelector(
      "link[rel='canonical']"
    ) as HTMLLinkElement | null;

    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }

  update(data: SeoConfig) {

    // TITLE
    this.title.setTitle(data.title);

    // DESCRIPTION
    this.meta.updateTag({
      name: 'description',
      content: data.description,
    });

    // ROBOTS
    this.meta.updateTag({
      name: 'robots',
      content: data.robots ?? 'index,follow',
    });

    // OPEN GRAPH
    this.meta.updateTag({
      property: 'og:title',
      content: data.title,
    });

    this.meta.updateTag({
      property: 'og:description',
      content: data.description,
    });

    this.meta.updateTag({
      property: 'og:url',
      content: data.canonicalUrl,
    });

    this.meta.updateTag({
      property: 'og:type',
      content: 'website',
    });

    if (data.image) {
      this.meta.updateTag({
        property: 'og:image',
        content: data.image,
      });
    }

    // TWITTER
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });

    this.meta.updateTag({
      name: 'twitter:title',
      content: data.title,
    });

    this.meta.updateTag({
      name: 'twitter:description',
      content: data.description,
    });

    if (data.image) {
      this.meta.updateTag({
        name: 'twitter:image',
        content: data.image,
      });
    }

    // CANONICAL
    this.setCanonical(data.canonicalUrl);
  }

  setJsonLd(schema: unknown) {
    const id = 'jsonld-schema';

    const existing = this.doc.getElementById(id);
    if (existing) {
      existing.remove();
    }

    const script = this.doc.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);

    this.doc.head.appendChild(script);
  }
}