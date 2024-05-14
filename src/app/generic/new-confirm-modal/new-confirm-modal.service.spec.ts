import { TestBed } from '@angular/core/testing';

import { NewConfirmModalService } from './new-confirm-modal.service';

describe('NewConfirmModalService', () => {
  let service: NewConfirmModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewConfirmModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
