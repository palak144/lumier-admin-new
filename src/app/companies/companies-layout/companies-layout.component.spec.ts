import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesLayoutComponent } from './companies-layout.component';

describe('CompaniesLayoutComponent', () => {
  let component: CompaniesLayoutComponent;
  let fixture: ComponentFixture<CompaniesLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompaniesLayoutComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
