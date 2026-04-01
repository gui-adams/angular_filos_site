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
    { label: 'Direito Penal', link: '/pos-graduacao-direito-penal-e-processo-penal-aguas-lindas-go' },
    { label: 'Direito Imobiliário', link: '/pos-graduacao-direito-imobiliario-e-regularizacao-fundiaria-aguas-lindas-go' },
    { label: 'Gestão de Operações 4.0', link: '/pos-graduacao-gestao-de-operacoes-aguas-lindas-go' },
    { label: 'Inteligência Artificial Aplicada aos Negócios', link: '/pos-graduacao-inteligencia-artificial-aplicada-aos-negocios-aguas-lindas-go' },
    { label: 'Docência no Ensino Superior', link: '/pos-graduacao-docencia-no-ensino-superior-aguas-lindas-go' },
    { label: 'Ressonância Magnética', link: '/pos-graduacao-ressonancia-magnetica-aguas-lindas-go' },
    { label: 'Neuropsicopedagogia', link: '/pos-graduacao-neuropsicopedagogia-aguas-lindas-go' },
  ];

  readonly extensionCourses: CourseMenuItem[] = [
    { label: 'Controle de Qualidade de Imagem e Artefatos Médicos', link: '/extensao-controle-de-qualidade-de-imagem-e-artefatos-medicos-aguas-lindas-go' },
    { label: 'Vendas Digitais (Redes Sociais e WhatsApp)', link: '/extensao-vendas-digitais-redes-sociais-e-whatsapp-business-aguas-lindas-go' },
    { label: 'Excelência no Atendimento e Fidelização', link: '/extensao-excelencia-no-atendimento-e-fidelizacao-de-clientes-aguas-lindas-go' },
    { label: 'Técnicas de Vendas e Negociação', link: '/extensao-tecnicas-de-vendas-e-negociacao-de-alto-impacto-aguas-lindas-go' },
    { label: 'Domínio das I.As: Criação de Textos e Imagens', link: '/extensao-dominio-das-i-as-criacao-de-textos-e-imagens-com-inteligencia-artificial-aguas-lindas-go' },
    { label: 'Automação Prática sem Programação', link: '/extensao-automacao-pratica-sem-programacao-no-code-aguas-lindas-go' },
    { label: 'Noções de Direito Penal e Segurança Cidadã', link: '/extensao-nocoes-de-direito-penal-e-seguranca-cidada-aguas-lindas-go' },
    { label: 'Lei Maria da Penha e Proteção à Família', link: '/extensao-lei-maria-da-penha-e-protecao-a-familia-aguas-lindas-go' },
    { label: 'Introdução à Regularização de Imóveis', link: '/extensao-introducao-a-regularizacao-de-imoveis-a-lei-da-reurb-aguas-lindas-go' },
    { label: 'REURB na Prática (Legalização)', link: '/extensao-reurb-na-pratica-o-passo-a-passo-da-legalizacao-aguas-lindas-go' },
    { label: 'Biossegurança em Ressonância', link: '/extensao-biosseguranca-e-prevencao-de-acidentes-em-ressonancia-aguas-lindas-go' },
    { label: 'Anatomia Seccional (Leitura Básica)', link: '/extensao-anatomia-seccional-leitura-basica-de-exames-de-imagem-aguas-lindas-go' },
    { label: 'Práticas de Inclusão e Direitos na Educação', link: '/extensao-praticas-de-inclusao-e-direitos-na-educacao-aguas-lindas-go' },
    { label: 'Ferramentas Digitais e Gamificação', link: '/extensao-ferramentas-digitais-e-gamificacao-no-ensino-aguas-lindas-go' },
    { label: 'Oratória e Comunicação Assertiva', link: '/extensao-oratoria-desinibicao-e-comunicacao-assertiva-aguas-lindas-go' },
  ];

  openInscricao() {
    this.subService.openForm('Menu Superior');
  }
}