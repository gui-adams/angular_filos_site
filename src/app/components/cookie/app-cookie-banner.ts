import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

declare let gtag: Function;

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.scss']
})
export class CookieBannerComponent implements OnInit {
  mostrarBanner: boolean = false; // Começa falso para evitar "pulo" no SSR

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // Só executa se estiver no navegador
    if (isPlatformBrowser(this.platformId)) {
      const consentimento = localStorage.getItem('lgpd_consentimento');
      
      if (!consentimento) {
        this.mostrarBanner = true;
      } else if (consentimento === 'aceito') {
        this.atualizarConsentimento('granted');
      }
    }
  }

  aceitarTodos(): void {
    this.mostrarBanner = false;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lgpd_consentimento', 'aceito');
      this.atualizarConsentimento('granted');
    }
  }

  recusarTodos(): void {
    this.mostrarBanner = false;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lgpd_consentimento', 'recusado');
      this.atualizarConsentimento('denied');
    }
  }

  private atualizarConsentimento(status: 'granted' | 'denied'): void {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', { 'analytics_storage': status });
    }
  }
}