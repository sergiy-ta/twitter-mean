import { TestBed } from '@angular/core/testing';

import { TwitteService } from './twitte.service';

describe('TwitteService', () => {
  let service: TwitteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwitteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
