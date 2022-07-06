import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveriesDrawerComponent } from './deliveries-drawer.component';

describe('DeliveriesDrawerComponent', () => {
  let component: DeliveriesDrawerComponent;
  let fixture: ComponentFixture<DeliveriesDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveriesDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveriesDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
