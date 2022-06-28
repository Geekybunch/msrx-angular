import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWellnessProfileComponent } from './update-wellness-profile.component';

describe('UpdateWellnessProfileComponent', () => {
  let component: UpdateWellnessProfileComponent;
  let fixture: ComponentFixture<UpdateWellnessProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateWellnessProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWellnessProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
