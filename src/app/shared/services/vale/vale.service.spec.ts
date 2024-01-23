import { TestBed } from '@angular/core/testing';

import { ValeService } from './vale.service';

describe('ValeService', () => {
  let service: ValeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
