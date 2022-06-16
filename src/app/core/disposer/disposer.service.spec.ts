import { TestBed } from '@angular/core/testing';

import { DisposerService } from './disposer.service';

describe('DisposerService', () => {
  let service: DisposerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisposerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
