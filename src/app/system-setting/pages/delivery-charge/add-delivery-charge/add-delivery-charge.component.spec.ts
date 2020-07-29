import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeliveryChargeComponent } from './add-delivery-charge.component';

describe('AddDeliveryChargeComponent', () => {
  let component: AddDeliveryChargeComponent;
  let fixture: ComponentFixture<AddDeliveryChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeliveryChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeliveryChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
