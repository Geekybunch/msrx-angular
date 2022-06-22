import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateAgenciesComponent } from './state-agencies.component';

describe('StateAgenciesComponent', () => {
  let component: StateAgenciesComponent;
  let fixture: ComponentFixture<StateAgenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateAgenciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateAgenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
