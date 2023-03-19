import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterCoursesComponent } from './center-courses.component';

describe('CenterCoursesComponent', () => {
  let component: CenterCoursesComponent;
  let fixture: ComponentFixture<CenterCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CenterCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
