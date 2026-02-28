import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { COURSES } from '../../../components/courses/courses.data';
import { Course } from '../../../components/courses/courses.model';


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

  readonly course: Course = COURSES.find((c) => c.id === 'adm')!;

  get heroImg(): string {
    return this.course.imageSrc; 
  }

  constructor() {
    const courseTitle = this.course?.title ?? 'Administração';
    this.title.setTitle(`Curso de ${courseTitle} | Faculdade Filos`);
    this.meta.updateTag({
      name: 'description',
      content:
        'Formar profissionais capazes de atuar de maneira estratégica, ética e inovadora na gestão de organizações públicas e privadas.',
    });
  }
}