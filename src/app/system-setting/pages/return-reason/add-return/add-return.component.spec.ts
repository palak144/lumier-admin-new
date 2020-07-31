import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReturnComponent } from './add-return.component';

describe('AddReturnComponent', () => {
  let component: AddReturnComponent;
  let fixture: ComponentFixture<AddReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
