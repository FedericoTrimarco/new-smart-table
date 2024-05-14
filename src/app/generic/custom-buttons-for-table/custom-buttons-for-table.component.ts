import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-buttons-for-table',
  templateUrl: './custom-buttons-for-table.component.html',
  styleUrls: ['./custom-buttons-for-table.component.scss']
})
export class CustomButtonsForTableComponent {
  renderValue!: string;
  name: string = '';

  @Output() actionEmit: EventEmitter<string> = new EventEmitter<string>();
  @Input() buttons: any;

  constructor(private router: Router) {
    console.log('@Input() buttons: >>', this.buttons);
    
  }

  onClick(button: any) {
    if (button.link) {
      this.router.navigate([button.link]);
    } else if (button.emit) {
      this.actionEmit.emit(button.emit);
    }
  
  }
}
