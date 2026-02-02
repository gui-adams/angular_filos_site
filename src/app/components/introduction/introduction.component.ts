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

  // autoplay
  private readonly intervalMs = 5000;
  private readonly resumeAfterInteractionMs = 8000;
  private resumeTimeoutId: any;

  // swipe
  private touchStartX = 0;
  private touchDeltaX = 0;
  private isTouching = false;
  private readonly swipeThresholdPx = 45;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadCarouselManifest();
      window.addEventListener('keydown', this.onKeyDown);
    }
  }

  ngOnDestroy(): void {
    this.stopCarousel();
    if (this.resumeTimeoutId) clearTimeout(this.resumeTimeoutId);
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('keydown', this.onKeyDown);
    }
  }

  private loadCarouselManifest(): void {
    this.http.get<{ images: string[] }>('assets/carrossel/manifest.json')
      .subscribe({
        next: (data) => {
          if (data.images && data.images.length > 0) {
            this.images = data.images.map(img => `assets/carrossel/${img}`);
            this.currentIndex = 0;
            this.imageSrc = this.images[0];
            this.startCarousel();
          }
        },
        error: (err) => {
          console.error('Erro ao carregar manifesto do carrossel:', err);
          this.images = ['assets/carrossel/ash.webp'];
          this.currentIndex = 0;
          this.imageSrc = this.images[0];
        }
      });
  }

  private startCarousel(): void {
    this.stopCarousel();
    if (!this.images || this.images.length <= 1) return;

    this.intervalId = setInterval(() => {
      this.goToIndex(this.currentIndex + 1, false);
    }, this.intervalMs);
  }

  private stopCarousel(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private scheduleResume(): void {
    if (this.resumeTimeoutId) clearTimeout(this.resumeTimeoutId);
    this.resumeTimeoutId = setTimeout(() => this.startCarousel(), this.resumeAfterInteractionMs);
  }

  private goToIndex(index: number, userInitiated = true): void {
    if (!this.images || this.images.length === 0) return;

    const len = this.images.length;
    const normalized = ((index % len) + len) % len;

    this.currentIndex = normalized;
    this.imageSrc = this.images[this.currentIndex];

    if (userInitiated) {
      // pausa e retoma depois
      this.stopCarousel();
      this.scheduleResume();
    }
  }

  prev(): void {
    this.goToIndex(this.currentIndex - 1, true);
  }

  next(): void {
    this.goToIndex(this.currentIndex + 1, true);
  }

  setSlide(i: number): void {
    this.goToIndex(i, true);
  }

  // teclado (setas esquerda/direita)
  private onKeyDown = (ev: KeyboardEvent) => {
    if (!this.images || this.images.length <= 1) return;
    if (ev.key === 'ArrowLeft') this.prev();
    if (ev.key === 'ArrowRight') this.next();
  };

  // swipe (mobile)
  onTouchStart(ev: TouchEvent): void {
    if (!this.images || this.images.length <= 1) return;
    this.isTouching = true;
    this.touchDeltaX = 0;
    this.touchStartX = ev.touches[0]?.clientX ?? 0;
  }

  onTouchMove(ev: TouchEvent): void {
    if (!this.isTouching) return;
    const x = ev.touches[0]?.clientX ?? 0;
    this.touchDeltaX = x - this.touchStartX;
  }

  onTouchEnd(): void {
    if (!this.isTouching) return;
    this.isTouching = false;

    if (Math.abs(this.touchDeltaX) >= this.swipeThresholdPx) {
      // arrastou pra esquerda => next; pra direita => prev
      if (this.touchDeltaX < 0) this.next();
      else this.prev();
    }
  }
}
