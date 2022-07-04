import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDileveryVehiclesComponent } from './add-dilevery-vehicles.component';

describe('AddDileveryVehiclesComponent', () => {
  let component: AddDileveryVehiclesComponent;
  let fixture: ComponentFixture<AddDileveryVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDileveryVehiclesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDileveryVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
