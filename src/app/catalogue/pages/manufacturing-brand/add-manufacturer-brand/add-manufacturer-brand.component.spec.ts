import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManufacturerBrandComponent } from './add-manufacturer-brand.component';

describe('AddManufacturerBrandComponent', () => {
  let component: AddManufacturerBrandComponent;
  let fixture: ComponentFixture<AddManufacturerBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddManufacturerBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddManufacturerBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
