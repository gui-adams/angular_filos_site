import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgOptimizedImage, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SubscriptionService } from '../../services/subscription.service';

interface CourseMenuItem {
  label: string;
  link: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, NgOptimizedImage, MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public subService = inject(SubscriptionService);
  readonly logoSrc = 'assets/logo.svg';

  readonly graduationCourses: CourseMenuItem[] = [
    { label: 'Administração', link: '/cursos/administracao' },
    { label: 'Direito', link: '/cursos/direito' },
    { label: 'Pedagogia', link: '/cursos/pedagogia' },
    { label: 'Radiologia', link: '/cursos/radiologia' },
  ];

  readonly postGraduationCourses: CourseMenuItem[] = [
    { label: 'Direito Penal', link: 'pos-graduacao-direito-penal-e-processo-penal-aguas-lindas-go' },
    { label: 'Direito Imobiliário', link: 'pos-graduacao-direito-imobiliario-e-regularizacao-fundiaria-aguas-lindas-go' },
    { label: 'Gestão de Operações 4.0', link: 'pos-graduacao-gestao-de-operacoes-aguas-lindas-go' },
    { label: 'Inteligência Artificial Aplicada aos Negócios', link: 'pos-graduacao-inteligencia-artificial-aplicada-aos-negocios-aguas-lindas-go' },
    { label: 'Docência no Ensino Superior', link: 'pos-graduacao-docencia-no-ensino-superior-aguas-lindas-go' },
    { label: 'Ressonância Magnética', link: 'pos-graduacao-ressonancia-magnetica-aguas-lindas-go' },
  ];

  openInscricao() {
    this.subService.openForm('Menu Superior');
  }
}