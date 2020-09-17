import { TestBed } from '@angular/core/testing';

import { MessegeService } from './messege.service';

describe('MessegeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessegeService = TestBed.get(MessegeService);
    expect(service).toBeTruthy();
  });
});
