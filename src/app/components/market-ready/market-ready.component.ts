import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
  selector: 'app-market-ready',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, MatIconModule],
  templateUrl: './market-ready.component.html',
  styleUrls: ['./market-ready.component.scss'],
})
export class MarketReadyComponent {
  readonly imageSrc = 'assets/mercado.webp';
  constructor(public subscriptionService: SubscriptionService) {}
}
