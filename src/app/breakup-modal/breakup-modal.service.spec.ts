import { TestBed } from '@angular/core/testing';

import { breakupmodalService } from './breakup-modal.service';

describe('breakupmodalService', () => {
  let service: breakupmodalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(breakupmodalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
