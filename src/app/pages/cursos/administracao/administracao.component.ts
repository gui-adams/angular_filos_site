import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-administracao',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './administracao.component.html',
  styleUrl: './administracao.component.scss',
})
export class AdministracaoComponent {
  private title = inject(Title);
  private meta = inject(Meta);

  // Verifique se a imagem está exatamente nesta pasta dentro de 'public' ou 'assets'
  heroImg = 'assets/cursos/administracao.webp';

  constructor() {
    this.title.setTitle('Curso de Administração | Faculdade Filos');
    this.meta.updateTag({
      name: 'description',
      content: 'Formar profissionais capazes de atuar de maneira estratégica, ética e inovadora na gestão de organizações públicas e privadas.',
    });
  }
}