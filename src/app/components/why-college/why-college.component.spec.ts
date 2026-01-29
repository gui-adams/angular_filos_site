import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyCollegeComponent } from './why-college.component';

describe('WhyCollegeComponent', () => {
  let component: WhyCollegeComponent;
  let fixture: ComponentFixture<WhyCollegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyCollegeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
