import { TestBed } from '@angular/core/testing';

import { WebConectionService } from './web-conection.service';

describe('WebConectionService', () => {
  let service: WebConectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebConectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
