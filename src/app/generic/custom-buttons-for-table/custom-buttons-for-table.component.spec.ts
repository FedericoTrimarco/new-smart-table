import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomButtonsForTableComponent } from './custom-buttons-for-table.component';

describe('CustomButtonsForTableComponent', () => {
  let component: CustomButtonsForTableComponent;
  let fixture: ComponentFixture<CustomButtonsForTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomButtonsForTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomButtonsForTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
