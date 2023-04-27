import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterstedComponent } from './intersted.component';

describe('InterstedComponent', () => {
  let component: InterstedComponent;
  let fixture: ComponentFixture<InterstedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterstedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterstedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
