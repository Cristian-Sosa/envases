import { TestBed } from '@angular/core/testing';

import { EnvasesService } from './envases.service';

describe('EnvasesService', () => {
  let service: EnvasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
