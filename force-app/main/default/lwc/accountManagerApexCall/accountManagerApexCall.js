import { LightningElement, wire } from 'lwc';
import getAllAccounts from '@salesforce/apex/AccountManager.getAccounts'; // This needs to be imported to get Apex method called Imperatively or by Wire Adapter

export default class AccountManagerApexCall extends LightningElement {

    @wire(getAllAccounts) accounts;   /*
                                        Method must be 'cacheable' to get called through 'Wire Adapter'.
                                        Here 'accounts' holds the value return from getAccount methods. 
                                        The Wire service either provisions the list of accounts to the 'accounts.data' property,
                                            or returns an error to the 'accounts.error' property
                                        */
    

    get responseReceived(){
        if(this.accounts){
            return true;
        }
        return false;
    }
}