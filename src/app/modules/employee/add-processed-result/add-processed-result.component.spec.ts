import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProcessedResultComponent } from './add-processed-result.component';

describe('AddProcessedResultComponent', () => {
  let component: AddProcessedResultComponent;
  let fixture: ComponentFixture<AddProcessedResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProcessedResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProcessedResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
