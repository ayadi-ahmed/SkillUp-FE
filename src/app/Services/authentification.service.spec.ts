import { TestBed } from '@angular/core/testing';

import { UserAuthentificationService } from './user-authentification.service';

describe('AuthentificationService', () => {
  let service: UserAuthentificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAuthentificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
