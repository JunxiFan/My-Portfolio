import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccesorryComponent } from './admin-accesorry.component';

describe('AdminAccesorryComponent', () => {
  let component: AdminAccesorryComponent;
  let fixture: ComponentFixture<AdminAccesorryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAccesorryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAccesorryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
