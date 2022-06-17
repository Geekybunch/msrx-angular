import { TestBed } from '@angular/core/testing';

import { DileveryVehicleService } from './dilevery-vehicle.service';

describe('DileveryVehicleService', () => {
  let service: DileveryVehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DileveryVehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
