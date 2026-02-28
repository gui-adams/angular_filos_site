import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

import { COURSES } from '../../../components/courses/courses.data';
import { Course } from '../../../components/courses/courses.model';

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

  readonly course: Course | undefined = COURSES.find((c) => c.id === 'ped');

  get heroImg(): string {
    return this.course?.imageSrc ?? 'assets/cursos/placeholder.webp';
  }

  constructor() {
    const courseTitle = this.course?.title ?? 'Pedagogia';

    this.title.setTitle(`Curso de ${courseTitle} | Faculdade Filos`);
    this.meta.updateTag({
      name: 'description',
      content:
        'Formar educadores comprometidos com a transformação social, a valorização da educação e a promoção da cidadania.',
    });
  }
}