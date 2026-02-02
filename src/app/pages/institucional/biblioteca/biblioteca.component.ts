import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

type DocLink = {
  title: string;
  subtitle: string;
  href: string;
};

@Component({
  selector: 'app-biblioteca',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss'],
})
export class BibliotecaComponent {
  docs: DocLink[] = [
    {
      title: 'Plano de Contingência',
      subtitle: 'Procedimentos e orientações para situações excepcionais',
      href: 'https://drive.google.com/file/d/1cp2Nsm1nqL-rDLTj9aM6udTt907y1QpL/view',
    },
    {
      title: 'Regulamento da Biblioteca',
      subtitle: 'Normas de uso, empréstimos e conduta',
      href: 'https://drive.google.com/file/d/1dOifs15Go2GZvY8UPHCXq9dCmLBD7JlQ/view',
    },
  ];
}
