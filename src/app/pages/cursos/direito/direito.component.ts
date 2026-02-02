import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-direito',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './direito.component.html',
  styleUrl: './direito.component.scss',
})
export class DireitoComponent {
  private title = inject(Title);
  private meta = inject(Meta);

  // Caminho da imagem otimizada no servidor
  heroImg = 'assets/cursos/direito.webp';

  constructor() {
    // Configuração de SEO amigável para SSR (Server-Side Rendering)
    this.title.setTitle('Curso de Direito | Faculdade Filos');
    this.meta.updateTag({
      name: 'description',
      content: 'Formar profissionais éticos, críticos e comprometidos com a promoção da justiça e da cidadania.',
    });
  }
}