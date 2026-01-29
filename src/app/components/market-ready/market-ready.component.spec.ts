import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketReadyComponent } from './market-ready.component';

describe('MarketReadyComponent', () => {
  let component: MarketReadyComponent;
  let fixture: ComponentFixture<MarketReadyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketReadyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketReadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
