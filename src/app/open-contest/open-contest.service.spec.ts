import { TestBed } from '@angular/core/testing';

import { OpenContestService } from './open-contest.service';

describe('OpenContestService', () => {
  let service: OpenContestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenContestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
