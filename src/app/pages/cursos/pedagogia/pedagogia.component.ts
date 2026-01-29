import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-administracao',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './pedagogia.component.html',
  styleUrl: './pedagogia.component.scss',
})
export class PedagogiaComponent {
  private title = inject(Title);
  private meta = inject(Meta);

  heroImg = '/cursos/pedagogia.webp';

  constructor() {
    this.title.setTitle('Pedagogia | Faculdade Filos');
    this.meta.updateTag({
      name: 'description',
      content:
        'Formar profissionais capazes de atuar de maneira estratégica, ética e inovadora na gestão de organizações públicas e privadas.',
    });
  }
}
