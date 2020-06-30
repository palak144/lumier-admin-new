import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueLayoutComponent } from './catalogue-layout.component';

describe('CatalogueLayoutComponent', () => {
  let component: CatalogueLayoutComponent;
  let fixture: ComponentFixture<CatalogueLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogueLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
