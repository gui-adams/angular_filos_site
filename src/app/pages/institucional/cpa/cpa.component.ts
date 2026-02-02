import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cpa',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterModule, MatIconModule],
  templateUrl: './cpa.component.html',
  styleUrls: ['./cpa.component.scss']
})
export class CpaComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('CPA - Comissão Própria de Avaliação | Faculdade Filos');
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Conheça a CPA da Faculdade Filos, responsável por coordenar os processos de avaliação institucional e melhoria da qualidade acadêmica.' 
    });
  }
}