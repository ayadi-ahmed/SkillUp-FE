import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutAbonnementComponent } from './checkout-abonnement.component';

describe('CheckoutAbonnementComponent', () => {
  let component: CheckoutAbonnementComponent;
  let fixture: ComponentFixture<CheckoutAbonnementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutAbonnementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutAbonnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
