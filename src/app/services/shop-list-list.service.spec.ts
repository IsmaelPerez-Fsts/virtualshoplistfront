import { TestBed } from '@angular/core/testing';

import { ShopListListService } from './shop-list-list.service';

describe('ShopListListService', () => {
  let service: ShopListListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopListListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
