import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, inject, computed, signal, effect } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

import { MatIconModule } from '@angular/material/icon';
import { SubscriptionService } from '../../services/subscription.service';

import { COURSES } from '../../components/courses/courses.data';
import { Course } from '../../components/courses/courses.model';

@Component({
  selector: 'app-course-page',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage, MatIconModule],
  templateUrl: './course-page.component.html',
})
export class CoursePageComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);

  // ✅ agora existe (pra (click)="subscriptionService.openForm(...)")
  readonly subscriptionService = inject(SubscriptionService);

  private readonly baseUrl = 'https://faculdadefilos.edu.br';

  // slug reativo (atualiza quando muda rota)
  slug = signal<string>(this.route.snapshot.paramMap.get('slug') ?? '');

  course = computed<Course | undefined>(() =>
    COURSES.find((c) => c.seoSlug === this.slug())
  );

  heroImg = computed(() => this.course()?.imageSrc ?? 'assets/cursos/placeholder.webp');

  kicker = computed(() => {
    const c = this.course();
    if (!c) return 'Curso';
    if (c.level === 'graduacao') return 'Graduação';
    if (c.level === 'pos') return 'Pós-graduação';
    if (c.level === 'mba') return 'MBA';
    return c.level;
  });

  whatsAppLink = computed(() => {
    const c = this.course();
    if (!c) return 'https://wa.me/5561999061757';

    const text = encodeURIComponent(
      c.content.whatsappText ?? `Olá! Gostaria de informações sobre o curso de ${c.title}.`
    );

    return `https://wa.me/5561999061757?text=${text}`;
  });

  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.slug.set(params.get('slug') ?? '');
    });

    effect(() => {
      const c = this.course();

      if (!c) {
        this.router.navigateByUrl('/');
        return;
      }

      const canonical = `${this.baseUrl}/${c.seoSlug}`;
      const image = c.seoImage ?? `${this.baseUrl}/${c.imageFront}`;

      this.title.setTitle(c.seoTitle);

      this.meta.updateTag({ name: 'description', content: c.seoDescription });
      this.meta.updateTag({ name: 'robots', content: 'index,follow' });

      this.meta.updateTag({ property: 'og:title', content: c.seoTitle });
      this.meta.updateTag({ property: 'og:description', content: c.seoDescription });
      this.meta.updateTag({ property: 'og:type', content: 'website' });
      this.meta.updateTag({ property: 'og:url', content: canonical });
      this.meta.updateTag({ property: 'og:image', content: image });

      this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.updateTag({ name: 'twitter:title', content: c.seoTitle });
      this.meta.updateTag({ name: 'twitter:description', content: c.seoDescription });
      this.meta.updateTag({ name: 'twitter:image', content: image });

      this.setCanonical(canonical);

      this.setJsonLd({
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: c.title,
        description: c.seoDescription,
        url: canonical,
        educationalLevel: this.kicker(),
        provider: {
          '@type': 'Organization',
          name: 'Faculdade Filos',
          url: this.baseUrl,
        },
      });
    });
  }

  hasAnySections(): boolean {
    const s = this.course()?.content?.sections;
    return !!(
      s?.objetivos?.length ||
      s?.estrutura?.length ||
      s?.diferenciais?.length ||
      s?.egresso?.length
    );
  }

  private setCanonical(url: string) {
    let link = this.doc.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setJsonLd(schema: unknown) {
    const id = 'jsonld-course';
    const existing = this.doc.getElementById(id);
    if (existing) existing.remove();

    const script = this.doc.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    this.doc.head.appendChild(script);
  }
}