import { TestBed } from '@angular/core/testing';

import { ErrorHandlerService } from './error-handler-service.service';
describe('ErrorHamdlerService', () => {
  let service: ErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
