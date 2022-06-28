import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseLocationMapComponent } from './choose-location-map.component';

describe('ChooseLocationMapComponent', () => {
  let component: ChooseLocationMapComponent;
  let fixture: ComponentFixture<ChooseLocationMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseLocationMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseLocationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
