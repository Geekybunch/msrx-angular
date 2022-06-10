import { TestBed } from '@angular/core/testing';

import { EmployeeAdminService } from './employee-admin.service';

describe('EmployeeAdminService', () => {
  let service: EmployeeAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
