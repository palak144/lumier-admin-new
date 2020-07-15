import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCombosComponent } from './add-combos.component';

describe('AddCombosComponent', () => {
  let component: AddCombosComponent;
  let fixture: ComponentFixture<AddCombosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCombosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCombosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
