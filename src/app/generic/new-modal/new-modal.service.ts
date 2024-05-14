import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewModalComponent } from './new-modal.component';

@Injectable({
  providedIn: 'root'
})
export class NewModalService {

  constructor(private modalService: NgbModal) { }

  public open(
    title: string,
    message: string,
    bgHeader: string = '',
    dialogSize: 'md'|'lg' = 'md'): Promise<boolean> {
    const modalRef = this.modalService.open(NewModalComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.bgHeader = bgHeader;

    return modalRef.result;
  }

}
