import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-radiologia',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './radiologia.component.html',
  styleUrl: './radiologia.component.scss',
})
export class RadiologiaComponent {
  private title = inject(Title);
  private meta = inject(Meta);

  // Caminho da imagem no servidor Hostinger
  heroImg = 'assets/cursos/radiologia.webp';

  constructor() {
    // SEO (SSR friendly)
    this.title.setTitle('Curso de Tecnólogo em Radiologia | Faculdade Filos');
    this.meta.updateTag({
      name: 'description',
      content: 'Formar profissionais capacitados para atuar de maneira ética e segura na realização de exames e procedimentos radiológicos.',
    });
  }
}