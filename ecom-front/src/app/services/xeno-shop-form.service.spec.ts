import { TestBed } from '@angular/core/testing';

import { XenoShopFormService } from './xeno-shop-form.service';

describe('XenoShopFormService', () => {
  let service: XenoShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XenoShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
