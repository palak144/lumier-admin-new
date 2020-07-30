import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCancelComponent } from './add-cancel.component';

describe('AddCancelComponent', () => {
  let component: AddCancelComponent;
  let fixture: ComponentFixture<AddCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
