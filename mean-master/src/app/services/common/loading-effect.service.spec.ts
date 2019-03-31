import { TestBed } from '@angular/core/testing';

import { LoadingEffectService } from './loading-effect.service';

describe('LoadingEffectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoadingEffectService = TestBed.get(LoadingEffectService);
    expect(service).toBeTruthy();
  });
});
