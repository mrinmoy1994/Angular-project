import { TestBed } from '@angular/core/testing';

import { SelectContestService } from './select-contest.service';

describe('SelectContestService', () => {
  let service: SelectContestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectContestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
