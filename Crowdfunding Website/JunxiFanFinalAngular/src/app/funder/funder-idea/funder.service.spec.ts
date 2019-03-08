import { TestBed, inject } from '@angular/core/testing';

import { FunderService } from './funder.service';

describe('FunderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FunderService]
    });
  });

  it('should be created', inject([FunderService], (service: FunderService) => {
    expect(service).toBeTruthy();
  }));
});
