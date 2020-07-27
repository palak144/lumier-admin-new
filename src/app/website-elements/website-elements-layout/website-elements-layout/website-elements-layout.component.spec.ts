import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteElementsLayoutComponent } from './website-elements-layout.component';

describe('WebsiteElementsLayoutComponent', () => {
  let component: WebsiteElementsLayoutComponent;
  let fixture: ComponentFixture<WebsiteElementsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteElementsLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteElementsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
