import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceLayoutComponent } from './experience-layout.component';

describe('CompaniesLayoutComponent', () => {
  let component: ExperienceLayoutComponent;
  let fixture: ComponentFixture<ExperienceLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExperienceLayoutComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
