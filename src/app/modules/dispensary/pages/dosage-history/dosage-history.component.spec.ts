import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DosageHistoryComponent } from './dosage-history.component';

describe('DosageHistoryComponent', () => {
  let component: DosageHistoryComponent;
  let fixture: ComponentFixture<DosageHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DosageHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DosageHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
