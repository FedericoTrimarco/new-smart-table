import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NewModalService } from './new-modal/new-modal.service';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(
    public router: Router,
    public modalComponent: NewModalService
  ) {}

  errorCount: boolean = false;
  errorCountAdmin: boolean = false;

  public getOptions(): any {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + sessionStorage.getItem('jwtToken') });
    return { headers: headers };
  }

  protected handleError(error: any): Promise<any> {
    console.log("handleError > "+JSON.stringify(error));
    return Promise.reject(error.message || error);
  }

  closeAllModal() {
    const arrayModal = document.getElementsByClassName('close-modal');
    for(let i = 0; i < arrayModal.length; i++){
      const element: HTMLElement = document.getElementsByClassName('close-modal')[i] as HTMLElement;
      element.click();
    }
  }

  logout() {
    this.router.navigate(['/auth/logout']);
  }

  openModalResponse(titolo: any, messaggio: any): void {
    this.modalComponent.open(titolo, messaggio);
  }
}
