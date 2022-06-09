import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmplyeeComponent } from './create-emplyee.component';

describe('CreateEmplyeeComponent', () => {
  let component: CreateEmplyeeComponent;
  let fixture: ComponentFixture<CreateEmplyeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEmplyeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEmplyeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
