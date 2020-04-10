import { TestBed } from '@angular/core/testing';

import { ShowTeamsService } from './show-teams.service';

describe('ShowTeamsService', () => {
  let service: ShowTeamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowTeamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
