import { TestBed } from '@angular/core/testing';

import { CreateteamService } from './createteam.service';

describe('CreateteamService', () => {
  let service: CreateteamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateteamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
