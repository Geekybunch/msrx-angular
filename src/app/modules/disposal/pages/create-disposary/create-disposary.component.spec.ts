import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDisposaryComponent } from './create-disposary.component';

describe('CreateDisposaryComponent', () => {
  let component: CreateDisposaryComponent;
  let fixture: ComponentFixture<CreateDisposaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDisposaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDisposaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
