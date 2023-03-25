import { TestBed } from '@angular/core/testing';

import { TrainingCenterService } from './training-center.service';

describe('TrainingCenterService', () => {
  let service: TrainingCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
