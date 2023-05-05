import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonnementTransactionsComponent } from './abonnement-transactions.component';

describe('AbonnementTransactionsComponent', () => {
  let component: AbonnementTransactionsComponent;
  let fixture: ComponentFixture<AbonnementTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbonnementTransactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbonnementTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
