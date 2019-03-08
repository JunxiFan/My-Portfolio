import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunderFundingComponent } from './funder-funding.component';

describe('FunderFundingComponent', () => {
  let component: FunderFundingComponent;
  let fixture: ComponentFixture<FunderFundingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunderFundingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunderFundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
