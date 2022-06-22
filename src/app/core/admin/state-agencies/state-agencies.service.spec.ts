import { TestBed } from '@angular/core/testing';

import { StateAgenciesService } from './state-agencies.service';

describe('StateAgenciesService', () => {
  let service: StateAgenciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateAgenciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
