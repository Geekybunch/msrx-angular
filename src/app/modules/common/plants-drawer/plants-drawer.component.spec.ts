import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsDrawerComponent } from './plants-drawer.component';

describe('PlantsDrawerComponent', () => {
  let component: PlantsDrawerComponent;
  let fixture: ComponentFixture<PlantsDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantsDrawerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantsDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
