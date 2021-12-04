import { TestBed } from '@angular/core/testing';
import { FetchDataApiService } from './fetch-api-data.service';

describe('FetchDataApiService', () => {
  let service: FetchDataApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchDataApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
