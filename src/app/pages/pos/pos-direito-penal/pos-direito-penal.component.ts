import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

import { COURSES } from '../../../components/courses/courses.data';
import { Course } from '../../../components/courses/courses.model';
import { applySeo, setCanonical, setJsonLd } from '../../../core/seo/seo-utils';

@Component({
  selector: 'app-pos-direito-penal',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './pos-direito-penal.component.html',
  
})
export class PosDireitoPenalComponent {
  private title = inject(Title);
  private meta = inject(Meta);

  readonly course: Course | undefined = COURSES.find((c) => c.id === 'pos-direito-penal');

  get heroImg(): string {
    return this.course?.imageSrc ?? 'assets/cursos/placeholder.webp';
  }

  constructor() {
    const baseUrl = 'https://faculdadefilos.edu.br';
    const slug = this.course?.seoSlug ?? 'pos-graduacao-direito-penal-processo-penal-aguas-lindas-go';
    const canonical = `${baseUrl}/${slug}`;

    const title = this.course?.seoTitle ?? 'Pós em Direito Penal e Processo Penal em Águas Lindas (GO) | Faculdade Filos';
    const description =
      this.course?.seoDescription ??
      'Especialização em Direito Penal e Processo Penal. Inscrição e informações do curso na Faculdade Filos.';

    const image = this.course?.seoImage ?? `${baseUrl}/${this.course?.imageFront ?? ''}`;

    applySeo(this.title, this.meta, { title, description, canonical, image });
    setCanonical(canonical);

    setJsonLd({
      "@context": "https://schema.org",
      "@type": "Course",
      "name": this.course?.title ?? "Direito Penal e Processo Penal",
      "description": description,
      "provider": {
        "@type": "Organization",
        "name": "Faculdade Filos",
        "url": baseUrl
      },
      "url": canonical,
      "educationalLevel": "Pós-graduação",
    }, 'jsonld-pos-direito-penal');
  }
}