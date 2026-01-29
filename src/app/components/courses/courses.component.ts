import { Component } from '@angular/core';
import { NgFor, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { COURSES } from './courses.data';
import { Course, CourseLevel } from './courses.model';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [NgFor, RouterLink, NgOptimizedImage, MatIconModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  readonly courses: Course[] = COURSES;
  activeTab: CourseLevel = 'graduacao';

  setTab(tab: CourseLevel) {
    this.activeTab = tab;
  }

  get filteredCourses(): Course[] {
    return this.courses.filter((c) => c.level === this.activeTab);
  }

  trackById(index: number, course: Course): string {
    return course.id;
  }
}
