import { LightningElement, wire } from 'lwc';
import getAllAccounts from '@salesforce/apex/AccountManager.getAccounts'; // This needs to be imported to get Apex method called Imperatively or by Wire Adapter
import { ShowToastEvent } from 'lightning/platformShowToastEvent';  // This needs to be imported to show Toast.

export default class AccountManagerApexCall extends LightningElement {
    debugger;
    /* 
        Before Spring'20, we need to import '@track' decorator to make varible(Primitive data types) reactive
        After Spring'20 @track decorator can be used for non-primitive e.g. Array, Objects etc.
    */
    noOfAccounts;
    accounts;

    /*              uncomment it for calling Apex using Wire Adapter
        @wire(getAllAccounts) accounts;  
    */
    
        /*
        Method must be 'cacheable' to get called through 'Wire Adapter'.
        Here 'accounts' holds the value return from getAccount methods. 
        The Wire service either provisions the list of accounts to the 'accounts.data' property,
            or returns an error to the 'accounts.error' property
        */
    
    numberOfAccountsChangeHandler(event){
        this.noOfAccounts = event.target.value;
    }

    getAccounts(){
        console.log('Inside Get Accounts : '+ this.noOfAccounts);
        getAllAccounts({numberOfRecords: this.noOfAccounts}).then(response =>{  // Here It will not work if we use '{numberOfRecords: noOfAccounts}' 
                                                                                // ('noOfAccounts' instead of 'this.noOfAccounts')
            console.log('response : '+JSON.stringify(response));
            this.accounts = response;

            /* 
                To show Toast on the screen, we have to first declare a 'ShowToastEvent' constructor and pass some parameters like 'title', 'message', 'variant'.
                Fire the toastEvent using 'dispatchEvent' method.
            */
           const toastEvent = new ShowToastEvent({
               title : 'Accounts Loaded',
               message : this.noOfAccounts + ': Accounts successfully fetched from server',
               variant : 'success'
           });
           this.dispatchEvent(toastEvent);

        }).catch(error =>{
             console.error('Error in getting the records: '+error.body.message);

            const toastEvent = new ShowToastEvent({
                title : 'Error',
                message : error.body.message,
                variant : 'error'
            });
            this.dispatchEvent(toastEvent);
        })

    }

    get responseReceived(){
        if(this.accounts){
            return true;
        }
        return false;
    }
}