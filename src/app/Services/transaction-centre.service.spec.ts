import { TestBed } from '@angular/core/testing';

import { TransactionCentreService } from './transaction-centre.service';

describe('TransactionCentreService', () => {
  let service: TransactionCentreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionCentreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
