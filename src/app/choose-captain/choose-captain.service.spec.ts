import { TestBed } from '@angular/core/testing';

import { ChooseCaptainService } from './choose-captain.service';

describe('ChooseCaptainService', () => {
  let service: ChooseCaptainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChooseCaptainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
