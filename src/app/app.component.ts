import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { CoursesComponent } from './components/courses/courses.component';
import { WhyCollegeComponent } from './components/why-college/why-college.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, IntroductionComponent, CoursesComponent, WhyCollegeComponent ],
  templateUrl: './app.component.html',
})
export class AppComponent {
}
