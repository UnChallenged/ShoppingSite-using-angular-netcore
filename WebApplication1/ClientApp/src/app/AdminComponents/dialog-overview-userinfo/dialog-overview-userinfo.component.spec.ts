import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogOverviewUserinfoComponent } from './dialog-overview-userinfo.component';

describe('DialogOverviewUserinfoComponent', () => {
  let component: DialogOverviewUserinfoComponent;
  let fixture: ComponentFixture<DialogOverviewUserinfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogOverviewUserinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOverviewUserinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
