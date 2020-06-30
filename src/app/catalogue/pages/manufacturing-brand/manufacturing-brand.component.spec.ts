import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingBrandComponent } from './manufacturing-brand.component';

describe('ManufacturingBrandComponent', () => {
  let component: ManufacturingBrandComponent;
  let fixture: ComponentFixture<ManufacturingBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturingBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturingBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
