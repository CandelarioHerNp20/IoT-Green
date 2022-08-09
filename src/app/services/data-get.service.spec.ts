import { TestBed } from '@angular/core/testing';

import { DataGetService } from './data-get.service';

describe('DataGetService', () => {
  let service: DataGetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataGetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
