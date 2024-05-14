import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Settings } from 'angular2-smart-table';

@Component({
  selector: 'app-main-apps',
  templateUrl: './main-apps.component.html',
  styleUrl: './main-apps.component.scss'
})
export class MainAppsComponent {

  settings: Settings = {
    columns: {
      id: {
        title: 'ID'
      },
      name: {
        title: 'Full Name'
      },
      username: {
        title: 'User Name'
      },
      email: {
        title: 'Email'
      }
    }
  };

  data = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz"
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv"
    },
    
    // ... list of items
    
    {
      id: 11,
      name: "Nicholas DuBuque",
      username: "Nicholas.Stanton",
      email: "Rey.Padberg@rosamond.biz"
    }
  ];
  
  constructor( private router: Router){
  }

  routeTo(path: any) {
    let ref = this;
    
    ref.router.navigate([path]);
  }

}
