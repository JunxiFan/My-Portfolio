import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStuffComponent } from './admin-stuff.component';

describe('AdminStuffComponent', () => {
  let component: AdminStuffComponent;
  let fixture: ComponentFixture<AdminStuffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStuffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
