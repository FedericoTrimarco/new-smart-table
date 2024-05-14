import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { Angular2SmartTableModule } from 'angular2-smart-table';
import { MainAppsModule } from './pages/main-apps/main-apps.module';
import { SmartTableModule } from './pages/smart-table/smart-table.module';
import { CustomButtonsForTableModule } from './generic/custom-buttons-for-table/custom-buttons-for-table.module';
// AOS STEP 1
import AOS from 'aos';
import 'aos/dist/aos.css';
//////

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CustomButtonsForTableModule ,MainAppsModule, SmartTableModule, Angular2SmartTableModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'new-smart-table';

  constructor( private router: Router){
  }

  ngOnInit(): void {
    // AOS STEP 2
    AOS.init({disable: 'mobile'});//AOS - 2
    AOS.refresh();//refresh method is called on window resize and so on, as it doesn't require to build new store with AOS elements and should be as light as possible.
    /////////////
  }

  routeTo(path: any) {
    let ref = this;

    ref.router.navigate([path]);
  }

  // this.routeTo('/pages/progetti-unisa/progetti/view/'+el.extEntityId);
}
