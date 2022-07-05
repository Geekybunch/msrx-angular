import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveDosageFormComponent } from './give-dosage-form.component';

describe('GiveDosageFormComponent', () => {
  let component: GiveDosageFormComponent;
  let fixture: ComponentFixture<GiveDosageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiveDosageFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiveDosageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
