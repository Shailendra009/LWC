import { LightningElement, wire } from 'lwc';
import getAllAccounts from '@salesforce/apex/AccountManager.getAccounts'; // This needs to be imported to get Apex method called Imperatively or by Wire Adapter

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
        }).catch(error =>{
            console.error('Error in getting the records: ',error.body.message);
        })

    }

    get responseReceived(){
        if(this.accounts){
            return true;
        }
        return false;
    }
}