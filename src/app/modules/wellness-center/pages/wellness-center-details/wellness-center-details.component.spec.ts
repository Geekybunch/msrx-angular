import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellnessCenterDetailsComponent } from './wellness-center-details.component';

describe('WellnessCenterDetailsComponent', () => {
  let component: WellnessCenterDetailsComponent;
  let fixture: ComponentFixture<WellnessCenterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellnessCenterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WellnessCenterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
