import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyAbonnementComponent } from './buy-abonnement.component';

describe('BuyAbonnementComponent', () => {
  let component: BuyAbonnementComponent;
  let fixture: ComponentFixture<BuyAbonnementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyAbonnementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyAbonnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
