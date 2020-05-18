import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsListingComponent } from './questions-listing.component';

describe('QuestionsListingComponent', () => {
  let component: QuestionsListingComponent;
  let fixture: ComponentFixture<QuestionsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
