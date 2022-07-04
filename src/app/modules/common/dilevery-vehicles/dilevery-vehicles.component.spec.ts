import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DileveryVehiclesComponent } from './dilevery-vehicles.component';

describe('DileveryVehiclesComponent', () => {
  let component: DileveryVehiclesComponent;
  let fixture: ComponentFixture<DileveryVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DileveryVehiclesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DileveryVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
