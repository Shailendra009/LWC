import { LightningElement, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';      // here 'lightning' represents namespace and 'uiRecordApi': module
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AccountManagerLDS extends LightningElement {
    debugger;
    @track accountName;
    @track accountPhone;
    @track accountWebsite;
    
    accountNameChangeHandler(event){
        this.accountName = event.target.value;
        console.log('accountName : ',this.accountName);
    }

    accountPhoneChangeHandler(event){
        this.accountPhone = event.target.value;
        console.log('accountPhone : ',this.accountPhone);
    }

    accountWebsiteChangeHandler(event){
        this.accountWebsite = event.target.value;
        console.log('accountWebsite : ',this.accountWebsite);
    }

    createAccount(){
        console.log('button clicked');
        const fields = {'Name': this.accountName, 'Phone': this.accountPhone, 'Website': this.accountWebsite};
        const recordInput = {apiName : 'Account', fields};
        console.log('recordInput : ' + JSON.stringify(recordInput));

        // 'createRecord' method from LDS allows to insert a record without the need of server side controller
        // createRecord(recordInput: Record): Promise<Record>
        // It returns a 'Promise object' that resolves when the record is created. To return record data back to the component, use the then() block.
        // To handle errors use catch() block.
        // 'Promise Object' represents the eventual completion(or failure) of an asynchronous operation, and its resulting value.

        createRecord(recordInput).then(response => {
            console.log('response : ' + JSON.stringify(response));
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Account created',
                    variant: 'success',
                }),
            );
            console.log('Account has been creted : ',response);
        }).catch(error => {
            console.log('Error : '+ JSON.stringify(error));
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error',
                }),
            );
            console.log('Error in creating Account : ',error.body.message);
        })
    }
}