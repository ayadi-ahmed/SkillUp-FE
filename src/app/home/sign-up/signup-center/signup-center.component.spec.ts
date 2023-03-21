import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupCenterComponent } from './signup-center.component';

describe('SignupCenterComponent', () => {
  let component: SignupCenterComponent;
  let fixture: ComponentFixture<SignupCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
