import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalListingComponent } from './professional-listing.component';

describe('ExpertListingComponent', () => {
  let component: ProfessionalListingComponent;
  let fixture: ComponentFixture<ProfessionalListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessionalListingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
