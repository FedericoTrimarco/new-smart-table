import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { NewModalService } from "./new-modal/new-modal.service";

@Injectable()
export class HookFunctions {

    /** ⁡⁣⁣⁢𝗜𝗡𝗦𝗧𝗥𝗨𝗖𝗧𝗜𝗢𝗡𝗦​⁡ 
     * 
     *      𝗜𝗧:  QUESTO FILE E' STATO CREATO UTILIZZANDO UNA VERSIONE DI NODE 18.13.0⁡ E ANGULAR 17.3.1,
     *      𝗘𝗡𝗚: THIS FILE WAS CREATED USING A VERSION OF NODE 18.13.0⁡ AND ANGULAR 17.3.1
     * 
     *  ⁡⁢⁣⁣1)⁡
     *      ⁡⁣⁢⁡⁢⁢𝗜𝗧⁡ : Importa il nome della classe ⁡⁣⁢⁣HookFunctions⁡ nei fornitori dei singoli componenti o ne nei fornitori di ⁡⁣⁢⁣App.component.ts⁡ .
     *      𝗘𝗡𝗚: Import the name of the ⁡⁣⁢⁣HookFunctions⁡ class into the providers of the individual components or ⁡⁣⁢⁣into⁡ the providers of ⁡⁣⁢⁣App.component.ts⁡ .
     * 
     *  ⁡⁢⁣⁣2)⁡
     *     𝗜𝗧: Nel ⁡⁣⁣⁢constructor⁡ di ogni componente typescript aggiungere ⁡⁣⁢⁣private hf: HookFunctions⁡⁡ (⁡⁣⁣⁢protected⁡ ⁡⁢⁣⁣se si vuole utilizzare una funzione anche nell'html⁡⁡), in modo tale da poter utilizzare le varie funzioni di questo file.
     *     ENG: In the ⁡⁣⁣⁢constructor⁡ of each typescript component add ⁡⁣⁢⁣private hf: HookFunctions⁡⁡ (⁡⁢⁣⁣⁡⁣⁣⁢protected⁡ ⁡⁢⁣⁣if you also want to use a function in the html⁡⁡), so that you can use the various functions of this file.
     * 
     * 
     *  ⁡⁣⁣⁢CREATE NEW FUNCTION⁡ 
     * 
     *      IT: Per tutte le nuove funzioni da voler inserire, ricordarsi di specificare il tipo di ogni parametro (stringa, numero, ecc..)
     *      ENG: For all the new functions you want to insert, remember to specify the type of each parameter (string, number, etc.)
     * 
    */

    constructor(
        private modalComponent: NewModalService,
    ) { }


    /* ⁡⁢⁣⁡⁢⁡⁢⁣⁣FORMATTAZIONE DA NUMERO A STRINGA NUMERICA EUROPEA⁡⁡⁡
    IT: Questa funzione restituisce un valore numerico in un valore con formattazione numerica europea (3333.33 => 3.333,33).⁡
    
    ENG: This function returns a numeric value in a European numeric formatted value (3333.33 => 3.333,33).⁡
    */
    formatNumberInCurrencyString(num: any) {
        let ref = this;

        if (typeof (num) == "string") {
            num = ref.formatCurrencyStringInNumber(num);
        }

        return num.toLocaleString("eu-EU", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }


    /* ⁡⁢⁣⁡⁢⁡⁢⁣⁡⁢⁣⁣FORMATTAZIONE DA STRINGA EUROPEA A NUMERO⁡
    IT: Questa funzione restituisce un valore con formattazione numerica europea in un valore numerico (3.333,33=> 3333.33).⁡
    
    ENG: This function returns a value with European numeric formatting in a numeric value (3.333,33=> 3333.33).⁡
    */
    formatCurrencyStringInNumber(numString: string) {
        return parseFloat(numString.replaceAll(".", "").replace(",", "."));
    }


    /* ⁡⁢⁣⁡⁢⁡⁢⁣⁡⁢⁣⁡⁢⁣⁣FORMATTAZIONE DATA SOLO GIORNO-MESE-ANNO⁡
        IT: Questa funzione formatta in tipo data in una stringa con solo giorno, mese e anno.⁡
        
        ENG: This function formats date type into a string with only day, month, and year.
    */
    formatDateEU(date: Date, viewHours: boolean = false) {

        if ((date instanceof Date) == false) {
            throw new Error("the 'formatDateEU' function needs a date type as its first parameter");
        }

        if (viewHours) {

            return date.toLocaleString([], { year: "numeric", month: "2-digit", day: "2-digit", hour: '2-digit', minute: '2-digit', second: '2-digit', });

        } else {

            return date.toLocaleString([], { year: "numeric", month: "2-digit", day: "2-digit" });

        }

    }


    /* ⁡⁢⁣⁣INSERIMENTO SOLO VALORI NUMERICI⁡
       IT: Questa funzione permette la digitazione (keypress) di soli valori numerici all'interno di un tag html input / textarea ecc..⁡

       ENG: This function allows the typing (keypress) of numeric values ​​only within an html input / textarea tag.⁡
   */
    preventLetters(ev: any) {

        if (!(/^([0-9])$/.test(ev.key))) {
            ev.preventDefault();
        }

    }


    /* ⁡⁢⁡⁢⁣⁣GENERAZIONE LISTA NUMERICA DA PUNTO (A) AD UN PUNTO (B)⁡⁡
        IT: Questa funzione permette la generazione di un array di numeri specificandone il punto A e il punto B. Opzionalmente è anche possibile invertire l'ordine degli elementi⁡.
        
        ENG: This function allows the generation of an array of numbers by specifying point A and point B. Optionally it is also possible to reverse the order of the elements⁡.⁡
    */
    generateNumberList(numFrom: number, numTo: number, reverse: boolean = false) {
        if (numFrom > numTo) {
            throw new Error("The 'numFrom' parameter cannot be greater than the 'numTo' parameter.");
        }

        let arrayNum: number[] = [];

        for (let i = numFrom; i <= numTo; i++) {
            arrayNum.push(i);
        }

        if (reverse) {
            arrayNum = arrayNum.reverse();
        }

        return arrayNum;
    }


    /* ⁡⁢⁣⁣FORMATTAZIONE FORM-VALUE IN STRINGA NUMERICA EUROPEA⁡
        IT: Questa funzione permette il patchValue di un formControl in una stringa numerica con formato europeo, utilizzando in un evento (change)

        ENG: This function allows the patchValue of a formControl to a numeric string with European format, using in a event (change)

        ES/EX :

        <form [formGroup]="⁡⁣⁣⁢formRegister⁡">
            <input type="text" formControlName="name" ⁡⁢⁢⁢(change)⁡="hf.patchValueNumberByFormAndControlName(⁡⁣⁣⁢formRegister⁡, ⁡⁣⁢⁣'name'⁡)">
        </form>
    */
    patchValueNumberByFormAndControlName(form: any, controlName: string) {
        let ref = this;

        form.get(controlName)?.patchValue(ref.formatNumberInCurrencyString(form.get(controlName)?.value));

    }


    /* ⁡⁢⁣⁡⁢⁣⁣OGGETTO GIA' PRESENTE IN ARRAY⁡
        IT: Questa funzione restituisce un booleano true se un oggetto è già presente in un array

        ENG: This function returns a boolean true if an object is already present in an array

    */
    isObjectInArray(obj: any, array: any[]): boolean {
        if (!Array.isArray(array)) {
            throw new Error('Il secondo argomento deve essere un array');
        }

        return array.some((el: any) => {
            let keys1 = Object.keys(el);
            let keys2 = Object.keys(obj);

            if (keys1.length !== keys2.length) {
                return false;
            }

            for (let key of keys1) {
                if (el[key] !== obj[key]) {
                    return false;
                }
            }

            return true;
        });
    }


    /* ⁡⁢⁣⁡⁢⁡⁢⁣⁣AGGREGAZIONE DATI ARRAY TRAMITE TRE CHIAVI⁡
        IT: Questa funzione restituisce un array aggregati in cui:
            - il secondo parametro è quello principale, tramite il quale viene fatta l'aggragazione
            - il terzo parametro è quello che andrà a differenziare la nuova chiave value
            - il 1uarto è la chiave dalla quale viene estrapolato il singolo valore

        ENG: This function returns an array aggregated in which:
            - the second parameter is the main one through which the aggregation is done
            - the third parameter is the one that will differentiate the new value key
            - the 1st quarter is the key from which the single value is extrapolated

    */
    aggregateDataByThreeKeys(data: any[], primaryKey: string, secondaryKey: string, valueKey: string): any[] {
        let result: { [key: string]: any } = {};

        data.forEach(entry => {
            let aggregationKey = entry[primaryKey];

            if (!result[aggregationKey]) {
                result[aggregationKey] = { [primaryKey]: aggregationKey };
            }

            let structureKey = entry[secondaryKey];
            result[aggregationKey][`value${structureKey}`] = entry[valueKey];
        });

        return Object.values(result);
    }

    // ⁡⁣⁣⁡⁣⁣⁡⁣⁣⁢VALIDAZIONI FORM GROUP⁡⁡

    /* ⁡⁢⁣⁣VALIDAZIONE FORM GROUP CON MESSAGGIO DI ERRORE OPZIONALE⁡
        IT: questa funzione restituisce un valore boolean se la variabile di tipo FormGroup è sta validata correttamente, in caso contrario
        restituisce un messaggio di errore con tutti i campi non validati.
        
        ⁡⁢⁣⁡⁣⁣⁢IMPORTANTE: Inserire id specifico per la form contente il paramentro ⁡⁣⁢⁣[formGroup]⁡ ⁡⁣⁣⁢e per ogni input / select di formControlName utilizzare anche un placeholder con una specifica della descrizione⁡⁡⁡⁡
        ⁡⁢⁣⁢ATTENZIONE: Il messaggio di errore si basa sulla chiave del FormControlName, senza placeholder non è possibile personalizzare la label⁡
 
        ENG: this function returns a boolean value if the FormGroup type variable has been validated correctly, otherwise
        returns an error message with all fields invalidated.
 
        ⁡⁣⁣⁢IMPORTANT: Insert specific id for the form containing the parameter ⁡⁣⁢⁣[formGroup]⁡ ⁡⁣⁣⁢and for each input/select of formControlName also use a placeholder with a description specification⁡⁡
        ⁡⁢⁣⁢ATTENTION: The error message is based on the FormControlName key, it is not possible to customize the label⁡
    */
    validateFormByFormGroupAndFormId(form: FormGroup, idForm: string, openModalError: boolean = false) {
        let ref = this;
        let checkForm: boolean = false;
        let formDom = document.getElementById(idForm);

        if (form.valid) {

            Object.entries(form.value).forEach((el: any) => {
                let htmlObj = formDom?.querySelector(`input[formControlName='${el[0]}']`) || formDom?.querySelector(`select[formControlName='${el[0]}']`) || formDom?.querySelector(`textarea[formControlName='${el[0]}']`) || formDom?.querySelector(`ng2-completer[formControlName='${el[0]}']`)?.querySelector('input');

                htmlObj?.classList.remove("border-danger");
            });

            checkForm = true;
        } else {

            let erroreDettaglio = "<strong>Controllare i seguenti campi obbligatori:</strong><br>";

            Object.entries(form.value).forEach((el: any) => {

                let htmlObj = formDom?.querySelector(`input[formControlName='${el[0]}']`) || formDom?.querySelector(`select[formControlName='${el[0]}']`) || formDom?.querySelector(`textarea[formControlName='${el[0]}']`) || formDom?.querySelector(`ng2-completer[formControlName='${el[0]}']`)?.querySelector('input');

                if (!form.get(el[0])?.valid) {
                    let nameError = htmlObj?.getAttribute("placeholder") != null ? htmlObj?.getAttribute("placeholder") : el[0];

                    htmlObj?.classList.add("border-danger");
                    erroreDettaglio += `- ${nameError}<br>`;
                } else {
                    htmlObj?.classList.remove("border-danger");
                }
            })

            if (openModalError) {
                ref.modalComponent.open("ATTENZIONE", "Informazioni mancanti e/o errate.<br><br>" + erroreDettaglio, "bg-warning text-white");
            }

            checkForm = false;
        }

        return checkForm;
    }


    /* ⁡⁢⁡⁢⁡⁢⁣⁣AGGIUNTA VALIDAZIONE SPAZI VUOTI PER FORM CONTROL⁡
    IT: Questo metodo aggiunge un controllo ad un formControl restituendo un errore nel caso in cui i valori fossero soli spazi bianchi

        ENG: This method adds a control to a form control returning an error if the values ​​were only whitespace.⁡
    */
    noWhitespaceValidator(control: any) {
        return (control.value || "").trim().length ? null : { "whitespace": true };
    }


    /* ⁡⁢⁡⁢⁡⁢⁡⁢⁣⁡⁢⁣⁣CONTROLLO VALIDAZIONE CAMPO OBBLIGATORIO NON COMPILATO⁡⁡
        IT: Questo metodo restituisce un boolean = true se il formControl non è stato compilato o se è stato compilato con campi vuoti.

        ENG: This method returns a boolean = true if the formControl was not populated or if it was populated with empty fields.⁡
        */
    isValidRequired(form: any, controlName: string) {

        if (form.controls[controlName].errors != null && (form.controls[controlName].errors.required || form.controls[controlName].errors.whitespace)) {

            return false;

        } else {

            return true;

        }
    }


    /* ⁡⁢⁡⁢⁡⁢⁡⁢⁣⁡⁢⁣⁣CONTROLLO VALIDAZIONE CAMPO EMAIL⁡⁡
        IT: Questo metodo restituisce un boolean = true se il formControl non è stato compilato con un tipo email.
        
        ENG: This method returns a boolean = true if the formControl was not populated with a email type.⁡
    */
    isValidEmail(form: any, controlName: string) {

        if (form.controls[controlName].errors != null && form.controls[controlName].errors.email) {

            return false;

        } else {

            return true;

        }
    }


    /* ⁡⁢⁡⁢⁡⁢⁡⁢⁣⁡⁢⁣⁣CONTROLLO VALIDAZIONE CAMPO MAXLENGTH⁡
        IT: Questo metodo restituisce un boolean = true se il formControl ha superato la sua massima lunghezza.

        ENG: This method returns a boolean = true if the formControl has exceeded its maxlength .⁡
    */
    isValidMaxLength(form: any, controlName: string) {

        if (form.controls[controlName].errors != null && form.controls[controlName].errors.maxlength != null) {

            return false;

        } else {

            return true;

        }
    }

}