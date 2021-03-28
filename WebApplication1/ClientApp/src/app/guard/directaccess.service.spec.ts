import { TestBed } from '@angular/core/testing';

import { DirectaccessService } from './directaccess.service';

describe('DirectaccessService', () => {
  let service: DirectaccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectaccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
