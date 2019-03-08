import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupBidComponent } from './startup-bid.component';

describe('StartupBidComponent', () => {
  let component: StartupBidComponent;
  let fixture: ComponentFixture<StartupBidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartupBidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartupBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
