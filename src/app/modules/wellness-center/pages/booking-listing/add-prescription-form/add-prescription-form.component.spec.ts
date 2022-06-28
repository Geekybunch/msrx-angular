import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrescriptionFormComponent } from './add-prescription-form.component';

describe('AddPrescriptionFormComponent', () => {
  let component: AddPrescriptionFormComponent;
  let fixture: ComponentFixture<AddPrescriptionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPrescriptionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPrescriptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
