import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cell, LocalDataSource, Settings } from 'angular2-smart-table';
import { CustomButtonsForTableComponent } from '../../generic/custom-buttons-for-table/custom-buttons-for-table.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NewConfirmModalService } from '../../generic/new-confirm-modal/new-confirm-modal.service';
import { NewModalService } from '../../generic/new-modal/new-modal.service';



@Component({
  selector: 'app-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrl: './smart-table.component.scss'
})
export class SmartTableComponent implements OnInit{

  //FORM-GROUP
  form: FormGroup = this.fb.group({
    name: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
  });

  // SETTINGS
  settings: any;

  // SOURCE
  source: LocalDataSource = new LocalDataSource();

  // MODAL
  @ViewChild('modalModificaDescrizioneProposta') modalModificaDescrizioneProposta: any;

  // VARIABLES
  userDetail: any;
  selectedRows: any = [];
  data = [
    {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha',
      email: 'Nathan@yesenia.net',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      username: 'Karianne',
      email: 'Julianne.OConner@kory.org',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      username: 'Kamren',
      email: 'Lucio_Hettinger@annie.ca',
    },
  ];

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private confirmModal: NewConfirmModalService,
    private modalComponent: NewModalService,
  ){
    let ref = this;

    ref.reloadSettings();
  }

  ngOnInit(): void {
    
  }

  reloadSettings(){
    let ref = this;

    ref.settings = {
      noDataMessage: "Nessun dato da visualizzare",
      mode: 'external',
      hideSubHeader: true,
      actions: false,
      selectMode: 'multi',
      columns: {
        id: {
          title: 'ID'
        },
        name: {
          title: 'Full Name',
          isSortable: false // sort -> ng2-smart-table
        },
        username: {
          title: 'User Name',
          valuePrepareFunction: (cell: any, row: any) => {
  
            return cell == 'Bret' ? 'TOP NUMBER ONE' : cell;
          }
        },
        email: {
          title: 'Email',
        },
        azioni: {
          title: 'Azioni',
          type: 'custom',
          isSortable: false,
          renderComponent: CustomButtonsForTableComponent,
          componentInitFunction: (instance: any, cell: any) => {

            instance.buttons = [];
  
            instance.buttons.push(
              {
                text: "",
                link: null,
                emit: "apriModale",
                title: "Vedi dettaglio Utenza",
                iconClass: "fas fa-book-open",
                btnId: null,
                stackIcon: false,
                stackClass: null,
                iconClassList: [],
                classList: "btn btn-warning text-white m-2 ",
              },
              {
                text: "",
                link: null,
                emit: "deleteRow",
                title: "Elimina Utenza",
                iconClass: "fas fa-trash",
                btnId: null,
                stackIcon: false,
                stackClass: null,
                iconClassList: [],
                classList: "btn btn-danger text-white",
              },
            )
  
            instance.actionEmit.subscribe((value: any) => {
              if(value=="apriModale"){
                ref.userDetail = cell.row.data;
                ref.openModalDescrizionePropostaMonitoraggio();
                ref.form.patchValue(
                  {
                    name: ref.userDetail.name,
                    username: ref.userDetail.username,
                    email: ref.userDetail.email,
                  }
                )
              }
              
              if(value == "deleteRow"){
                ref.deleteUser(cell.row.data.id);
              }

            })
          }
        }
      },
      attr: {
        class: 'styled-table-1 noButtonTwo'
      }
    };
  }

  openModalDescrizionePropostaMonitoraggio(){
    let ref = this;

    ref.setupForm();
    ref.modalService.open(ref.modalModificaDescrizioneProposta , { size: "xl",});
  }

  onUserRowSelect(event: any) {
    let ref = this;

    ref.selectedRows = [];

    event.selected.forEach((el: any) => {
      ref.selectedRows.push(el.id);
    });

    console.log('ref.selectedRows >>', ref.selectedRows);
    
	}

  deleteUser(id: number) {
    let ref = this;

    ref.confirmModal.confirm('CONFERMA OPERAZIONE', `Sicuro di voler eliminare l'utenza con ID ${id} ?`)
    .then(
      res => {
        if(res == true){
          
          let index = ref.data.findIndex(el => el.id == id);
          ref.data.splice(index, 1);

          ref.reloadSettings();
          ref.modalComponent.open('CONFERMA OPERAZIONE', 'Utenza eliminata con successo.', 'bg-success');
      
        }
        
      }
    )
    .catch();
  }

  deleteAllUserSelected() {
    let ref = this;

    ref.confirmModal.confirm('CONFERMA OPERAZIONE', `Sicuro di voler eliminare le utenze selezionate ?`)
    .then(
      res => {
        if(res == true){
          
          ref.data.forEach((el: any, index: any) => {
            if(ref.selectedRows.includes(el.id)){
              ref.data.splice(index, 1);
            }
          });

          ref.reloadSettings();
          ref.modalComponent.open('CONFERMA OPERAZIONE', 'Utenze eliminate con successo.', 'bg-success');
      
        }
        
      }
    )
    .catch();
  }

  setupForm() {
    let ref = this;

		ref.form = ref.fb.group({
			name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
		});

    console.log(ref.form);
    console.log(Object.entries(ref.form.value));
    
	}

  validateForm(){
    let ref = this;
    let checkForm = false;

    if(ref.form.valid){
      checkForm = true;
    } else{

      let erroreDettaglio = '<strong>Controllare i seguenti campi:</strong><br>';

      Object.entries(ref.form.value).forEach((el:any) =>{
        if(!ref.form.get(el[0])?.valid){
          document.getElementById(el[0])?.classList.add('border-danger');
          erroreDettaglio += `- ${el[0]}<br>`;
        } else {
          document.getElementById(el[0])?.classList.remove('border-danger');
        }
      })

      ref.modalComponent.open('OPERAZIONE FALLITA', '<b>ATTENZIONE!</b><br>Informazioni mancanti e/o errate.<br><br>' + erroreDettaglio, 'bg-success text-white');

      checkForm = false
    }

    return checkForm;
  }

  updateUser(modal: any){
    let ref = this;

    if(ref.validateForm() == false){
      return;
    }

    ref.userDetail.name = ref.form.get("name")?.value;
    ref.userDetail.username = ref.form.get("username")?.value;
    ref.userDetail.email = ref.form.get("email")?.value;

    ref.reloadSettings();
    modal.dismiss();
    ref.modalComponent.open('CONFERMA OPERAZIONE', 'Utenza modificata con successo.', 'bg-success');
  }
}
