import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    count = 0;
    constructor(private router: Router,) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(sessionStorage.getItem('jwtToken') != null){

            let token = sessionStorage.getItem('jwtToken');
            token = JSON.parse(token ? token : '');
            console.log('INTERCEPT ACTIVE');
            console.log('request url >>', request);
    
            if (request.url != 'https://use.fontawesome.com/releases/v5.15.4/css/all.css' && request.url != `${environment.apiEndpoint}/CARavellaTravelsRest/rest/login/login`) {
                
                if (token) {
                    console.log(token);
                    
    
                    request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
                    
                }
    
                if (!request.headers.has('Content-Type')) {
                    request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    
                }
            }
    
        }
        let loader = document.getElementById('loader-container');
        console.log(loader);
        
        
        if(loader){
            console.log(loader);
            
            loader.classList.remove('d-none');
        }
        

        this.count++;

        return next.handle(request)

            .pipe(

                tap(

                    event => {

                        if (event instanceof HttpResponse) {
                            
                            if (event.body && event.body.errorCode == 99) {

                                /* this.toasterService.danger(event.body.errorMessage, 'ATTENZIONE', {
                                    duration : 10000,
                                    destroyByClick : true,
                                    preventDuplicates : true,
                                    position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
                                }); */

                            }

                        }
                        
                        return event;
                    },

                    error => {

                        if (error.status != 999) {

                            let errorMessage = 'C\'è stato un errore server durante la richiesta effettuata.'
                                            +' Si prega di riprovare più tardi e se il problema dovesse persistere'
                                            +' contattare l\'amministratore di sistema.';

                            if (error.status == 401) {
                                errorMessage = "Sessione scaduta. Effettuare nuovamente l'accesso.";
                            }
                            if (error.status == 404) {
                                errorMessage = "Richiesta non trovata.";
                            }

                            if(loader){
                                loader.classList.add('d-none');
                            }

                            if (error.status == 401) {
                                setTimeout( () => this.logout(), 3000);
                            }

                        }

                        return error;

                    },

                ),

                finalize(() => {

                    this.count--;

                    if ( this.count == 0 ) {
                        // console.log("Nascondi Spinner")
                        if(loader){
                            loader.classList.add('d-none');
                        }
                    }
                }),

            );
    }

    logout(){
        this.router.navigate(['account/login']);
    }


}