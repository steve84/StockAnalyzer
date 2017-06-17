import { TestBed, inject } from '@angular/core/testing';

import { TechnicaldataService } from './technicaldata.service';

describe('TechnicaldataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TechnicaldataService]
    });
  });

  it('should be created', inject([TechnicaldataService], (service: TechnicaldataService) => {
    expect(service).toBeTruthy();
  }));
});
