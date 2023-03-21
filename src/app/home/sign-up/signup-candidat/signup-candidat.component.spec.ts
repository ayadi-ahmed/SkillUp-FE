import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupCandidatComponent } from './signup-candidat.component';

describe('SignupCandidatComponent', () => {
  let component: SignupCandidatComponent;
  let fixture: ComponentFixture<SignupCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupCandidatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
