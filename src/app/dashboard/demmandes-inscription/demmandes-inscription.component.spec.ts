import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemmandesInscriptionComponent } from './demmandes-inscription.component';

describe('DemmandesInscriptionComponent', () => {
  let component: DemmandesInscriptionComponent;
  let fixture: ComponentFixture<DemmandesInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemmandesInscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemmandesInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
