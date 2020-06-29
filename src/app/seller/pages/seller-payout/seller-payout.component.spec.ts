import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPayoutComponent } from './seller-payout.component';

describe('SellerPayoutComponent', () => {
  let component: SellerPayoutComponent;
  let fixture: ComponentFixture<SellerPayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerPayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
