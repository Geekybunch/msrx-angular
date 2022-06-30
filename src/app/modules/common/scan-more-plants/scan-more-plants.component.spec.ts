import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanMorePlantsComponent } from './scan-more-plants.component';

describe('ScanMorePlantsComponent', () => {
  let component: ScanMorePlantsComponent;
  let fixture: ComponentFixture<ScanMorePlantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScanMorePlantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanMorePlantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
