import { TestBed } from '@angular/core/testing';

import { EventSignupService } from './event-signup.service';

describe('EventSignupService', () => {
  let service: EventSignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventSignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
