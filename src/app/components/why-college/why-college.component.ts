import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-why-college',
  standalone: true,
  imports: [NgOptimizedImage, MatIconModule],
  templateUrl: './why-college.component.html',
  styleUrls: ['./why-college.component.scss'],
})
export class WhyCollegeComponent {
  readonly imageSrc = 'assets/porque.webp';
}
