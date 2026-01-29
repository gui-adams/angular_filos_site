import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { CoursesComponent } from './components/courses/courses.component';
import { WhyCollegeComponent } from './components/why-college/why-college.component';
import { MarketReadyComponent } from './components/market-ready/market-ready.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, IntroductionComponent, CoursesComponent, WhyCollegeComponent, MarketReadyComponent, TestimonialsComponent, FooterComponent ],
  templateUrl: './app.component.html',
})
export class AppComponent {
}
