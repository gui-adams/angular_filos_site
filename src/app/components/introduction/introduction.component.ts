import { Component, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterModule],
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit, OnDestroy {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  
  images: string[] = [];
  currentIndex = 0;
  imageSrc: string = '';
  private intervalId: any;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadCarouselManifest();
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private loadCarouselManifest(): void {
    this.http.get<{ images: string[] }>('assets/carrossel/manifest.json')
      .subscribe({
        next: (data) => {
          if (data.images && data.images.length > 0) {
            this.images = data.images.map(img => `assets/carrossel/${img}`);
            this.imageSrc = this.images[0];
            this.startCarousel();
          }
        },
        error: (err) => {
          console.error('Erro ao carregar manifesto do carrossel:', err);
          this.imageSrc = 'assets/carrossel/ash.webp'; 
        }
      });
  }

  private startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.imageSrc = this.images[this.currentIndex];
    }, 5000);
  }
}