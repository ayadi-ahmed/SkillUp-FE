import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsClientComponent } from './transactions-client.component';

describe('TransactionsClientComponent', () => {
  let component: TransactionsClientComponent;
  let fixture: ComponentFixture<TransactionsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
