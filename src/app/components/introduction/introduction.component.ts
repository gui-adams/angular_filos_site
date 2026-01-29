import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
})
export class IntroductionComponent {
  readonly imageSrc = 'assets/capa1.png';
}
