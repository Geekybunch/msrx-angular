import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryLogsComponent } from './inventory-logs.component';

describe('InventoryLogsComponent', () => {
  let component: InventoryLogsComponent;
  let fixture: ComponentFixture<InventoryLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryLogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
