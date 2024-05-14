import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConfirmModalComponent } from './new-confirm-modal.component';

describe('NewConfirmModalComponent', () => {
  let component: NewConfirmModalComponent;
  let fixture: ComponentFixture<NewConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewConfirmModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
