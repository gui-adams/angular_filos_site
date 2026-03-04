import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

import { COURSES } from '../../../components/courses/courses.data';
import { Course } from '../../../components/courses/courses.model';
import { applySeo, setCanonical, setJsonLd } from '../../../core/seo/seo-utils';

@Component({
  selector: 'app-pos-gestao-operacoes',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './pos-gestao-operacoes.component.html',
})
export class PosGestaoOperacoesComponent {
  private title = inject(Title);
  private meta = inject(Meta);

  readonly course: Course | undefined = COURSES.find((c) => c.id === 'pos-gestao-operacoes');

  get heroImg(): string {
    return this.course?.imageSrc ?? 'assets/cursos/placeholder.webp';
  }

  constructor() {
    const baseUrl = 'https://faculdadefilos.edu.br';
    const slug = this.course?.seoSlug ?? 'pos-graduacao-gestao-de-operacoes-aguas-lindas-go';
    const canonical = `${baseUrl}/${slug}`;

    const title = this.course?.seoTitle ?? 'Pós em Gestão de Operações em Águas Lindas (GO) | Faculdade Filos';
    const description =
      this.course?.seoDescription ??
      'Especialização em Gestão de Operações. Inscrição e informações do curso na Faculdade Filos.';

    const image = this.course?.seoImage ?? `${baseUrl}/${this.course?.imageFront ?? ''}`;

    applySeo(this.title, this.meta, { title, description, canonical, image });
    setCanonical(canonical);

    setJsonLd({
      "@context": "https://schema.org",
      "@type": "Course",
      "name": this.course?.title ?? "Gestão de Operações",
      "description": description,
      "provider": { "@type": "Organization", "name": "Faculdade Filos", "url": baseUrl },
      "url": canonical,
      "educationalLevel": "Pós-graduação",
    }, 'jsonld-pos-gestao-operacoes');
  }
}