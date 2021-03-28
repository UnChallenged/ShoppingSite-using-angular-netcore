import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ManageprofileComponent } from './manageprofile.component';

describe('ManageprofileComponent', () => {
  let component: ManageprofileComponent;
  let fixture: ComponentFixture<ManageprofileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
