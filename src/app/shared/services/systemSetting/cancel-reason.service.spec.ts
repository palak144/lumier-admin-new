import { TestBed } from '@angular/core/testing';

import { CancelReasonService } from './cancel-reason.service';

describe('CancelReasonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CancelReasonService = TestBed.get(CancelReasonService);
    expect(service).toBeTruthy();
  });
});
