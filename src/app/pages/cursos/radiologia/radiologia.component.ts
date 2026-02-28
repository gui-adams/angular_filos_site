import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

import { COURSES } from '../../../components/courses/courses.data';
import { Course } from '../../../components/courses/courses.model';

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

  // ✅ agora existe no componente (o template consegue acessar)
  readonly course: Course | undefined = COURSES.find((c) => c.id === 'rad'); // ajuste o id se for diferente

  get heroImg(): string {
    return this.course?.imageSrc ?? 'assets/cursos/placeholder.webp';
  }

  constructor() {
    const courseTitle = this.course?.title ?? 'Radiologia';

    this.title.setTitle(`Curso de ${courseTitle} | Faculdade Filos`);
    this.meta.updateTag({
      name: 'description',
      content:
        'Formar profissionais capacitados para atuar de maneira ética e segura na realização de exames e procedimentos radiológicos.',
    });
  }
}