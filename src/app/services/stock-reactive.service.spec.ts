import { TestBed } from '@angular/core/testing';

import { StockReactiveService } from './stock-reactive.service';

describe('StockReactiveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockReactiveService = TestBed.get(StockReactiveService);
    expect(service).toBeTruthy();
  });
});
