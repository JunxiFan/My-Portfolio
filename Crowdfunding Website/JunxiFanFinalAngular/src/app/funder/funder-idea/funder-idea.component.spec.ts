import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunderIdeaComponent } from './funder-idea.component';

describe('FunderIdeaComponent', () => {
  let component: FunderIdeaComponent;
  let fixture: ComponentFixture<FunderIdeaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunderIdeaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunderIdeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
