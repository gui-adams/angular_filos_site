import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

import { COURSES } from '../../../components/courses/courses.data';
import { Course } from '../../../components/courses/courses.model';

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

  readonly course: Course | undefined = COURSES.find((c) => c.id === 'dir'); // 👈 ajuste o id conforme seu COURSES

  get heroImg(): string {
    return this.course?.imageSrc ?? 'assets/cursos/placeholder.webp';
  }

  constructor() {
    const courseTitle = this.course?.title ?? 'Direito';

    this.title.setTitle(`Curso de ${courseTitle} | Faculdade Filos`);
    this.meta.updateTag({
      name: 'description',
      content:
        'Formar profissionais éticos, críticos e comprometidos com a promoção da justiça e da cidadania.',
    });
  }
}