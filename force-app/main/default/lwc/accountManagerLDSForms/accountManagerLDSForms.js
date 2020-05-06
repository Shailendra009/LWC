import { LightningElement } from 'lwc';

export default class AccountManagerLDSForms extends LightningElement {
    
    recordId;   // Before Spring'20, we need to import track decorator to make varible(Primitive data types) reactive
                // After Spring'20 @track decorator can be used for non-primitive e.g. Array, Objects etc.

    successHandler(event){
        this.recordId = event.detail.id;     // used to get the Id of current record
    }  
}