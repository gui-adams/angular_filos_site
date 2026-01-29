import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';

import { TESTIMONIALS } from './testimonials.data';
import { Testimonial } from './testimonial.model';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [NgFor, NgOptimizedImage],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent {
  readonly testimonials: Testimonial[] = TESTIMONIALS;

  trackById(_: number, item: Testimonial) {
    return item.id;
  }
}
