import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-pedagogia',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './pedagogia.component.html',
  styleUrl: './pedagogia.component.scss',
})
export class PedagogiaComponent {
  private title = inject(Title);
  private meta = inject(Meta);

  heroImg = 'assets/cursos/pedagogia.webp';

  constructor() {
    this.title.setTitle('Curso de Pedagogia | Faculdade Filos');
    this.meta.updateTag({
      name: 'description',
      content: 'Formar educadores comprometidos com a transformação social, a valorização da educação e a promoção da cidadania.',
    });
  }
}