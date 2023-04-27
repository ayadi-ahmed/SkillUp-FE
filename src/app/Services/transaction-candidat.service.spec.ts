import { TestBed } from '@angular/core/testing';

import { TransactionCandidatService } from './transaction-candidat.service';

describe('TransactionCandidatService', () => {
  let service: TransactionCandidatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionCandidatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
