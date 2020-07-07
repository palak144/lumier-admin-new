import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSystemSettingComponent } from './add-system-setting.component';

describe('AddSystemSettingComponent', () => {
  let component: AddSystemSettingComponent;
  let fixture: ComponentFixture<AddSystemSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSystemSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSystemSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
