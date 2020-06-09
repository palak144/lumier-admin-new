import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertListingComponent } from './expert-listing.component';

describe('ExpertListingComponent', () => {
  let component: ExpertListingComponent;
  let fixture: ComponentFixture<ExpertListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertListingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpertListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
