import { TestBed } from '@angular/core/testing';

import { RedbookService } from './redbook.service';

describe('RedbookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RedbookService = TestBed.get(RedbookService);
    expect(service).toBeTruthy();
  });
});
