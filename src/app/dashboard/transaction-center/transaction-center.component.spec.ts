import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCenterComponent } from './transaction-center.component';

describe('TransactionCenterComponent', () => {
  let component: TransactionCenterComponent;
  let fixture: ComponentFixture<TransactionCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
