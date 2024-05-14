import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewConfirmModalComponent } from './new-confirm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class NewConfirmModalService {

  constructor(private modalService: NgbModal) { }

  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'Conferma',
    btnCancelText: string = 'Annulla',
    dialogSize: 'md'|'lg' = 'md'): Promise<boolean> {
    const modalRef = this.modalService.open(NewConfirmModalComponent, { size: dialogSize, backdrop: 'static' });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }

}
