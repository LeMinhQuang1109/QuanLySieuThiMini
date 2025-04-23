import { TestBed } from '@angular/core/testing';

import { CustomeserviceService } from './customeservice.service';

describe('CustomeserviceService', () => {
  let service: CustomeserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomeserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
