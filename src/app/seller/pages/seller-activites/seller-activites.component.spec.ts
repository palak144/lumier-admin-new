import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerActivitesComponent } from './seller-activites.component';

describe('SellerActivitesComponent', () => {
  let component: SellerActivitesComponent;
  let fixture: ComponentFixture<SellerActivitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerActivitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerActivitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
