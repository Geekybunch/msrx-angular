import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionsDrawerComponent } from './prescriptions-drawer.component';

describe('PrescriptionsDrawerComponent', () => {
  let component: PrescriptionsDrawerComponent;
  let fixture: ComponentFixture<PrescriptionsDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescriptionsDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionsDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
