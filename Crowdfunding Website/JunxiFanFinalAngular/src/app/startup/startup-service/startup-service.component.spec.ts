import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupServiceComponent } from './startup-service.component';

describe('StartupServiceComponent', () => {
  let component: StartupServiceComponent;
  let fixture: ComponentFixture<StartupServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartupServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartupServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
