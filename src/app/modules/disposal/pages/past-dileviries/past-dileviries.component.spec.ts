import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastDileviriesComponent } from './past-dileviries.component';

describe('PastDileviriesComponent', () => {
  let component: PastDileviriesComponent;
  let fixture: ComponentFixture<PastDileviriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastDileviriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastDileviriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
