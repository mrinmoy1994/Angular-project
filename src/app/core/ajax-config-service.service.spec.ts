import { TestBed } from '@angular/core/testing';

import { AjaxConfigServiceService } from './ajax-config-service.service';

describe('AjaxConfigServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AjaxConfigServiceService = TestBed.get(AjaxConfigServiceService);
    expect(service).toBeTruthy();
  });
});
