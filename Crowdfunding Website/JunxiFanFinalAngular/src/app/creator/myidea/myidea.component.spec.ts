import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyideaComponent } from './myidea.component';

describe('MyideaComponent', () => {
  let component: MyideaComponent;
  let fixture: ComponentFixture<MyideaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyideaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyideaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
