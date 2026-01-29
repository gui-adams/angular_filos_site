import { Component } from '@angular/core';

import { IntroductionComponent } from '../../components/introduction/introduction.component';
import { CoursesComponent } from '../../components/courses/courses.component';
import { WhyCollegeComponent } from '../../components/why-college/why-college.component';
import { MarketReadyComponent } from '../../components/market-ready/market-ready.component';
import { TestimonialsComponent } from '../../components/testimonials/testimonials.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    IntroductionComponent,
    CoursesComponent,
    WhyCollegeComponent,
    MarketReadyComponent,
    TestimonialsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
