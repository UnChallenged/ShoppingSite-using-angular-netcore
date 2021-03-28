import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TopnavbarComponent } from './topnavbar.component';

describe('TopnavbarComponent', () => {
  let component: TopnavbarComponent;
  let fixture: ComponentFixture<TopnavbarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TopnavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
