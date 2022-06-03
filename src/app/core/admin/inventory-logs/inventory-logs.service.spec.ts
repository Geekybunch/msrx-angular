import { TestBed } from '@angular/core/testing';

import { InventoryLogsService } from './inventory-logs.service';

describe('InventoryLogsService', () => {
  let service: InventoryLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
