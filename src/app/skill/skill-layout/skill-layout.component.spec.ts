import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillLayoutComponent } from './skill-layout.component';

describe('CategoriesLayoutComponent', () => {
  let component: SkillLayoutComponent;
  let fixture: ComponentFixture<SkillLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SkillLayoutComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
