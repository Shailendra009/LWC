import { LightningElement } from 'lwc';

/*  
we don't need to import fields from salesforce schema while using 'layout-type = Full/Compact' instead of 'fields'

import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import WEBSITE_FIELD from '@salesforce/schema/Account.Website';
*/


export default class AccountRecordForm extends LightningElement {
    
    recordId;   // Before Spring'20, we need to import track decorator to make varible(Primitive data types) reactive
                // After Spring'20 @track decorator can be used for non-primitive e.g. Array, Objects etc.

    //fieldArray = ['Name', 'Phone', 'Website'];
    // fieldArray = [NAME_FIELD, PHONE_FIELD, WEBSITE_FIELD];  // used when using 'fields' instead of 'layout-type = Full/Compact'

    /*
        Giving hard reference to the fields or objects is always preferred as it will automatically pickup the changes
        when you modify your fields or objects. 
        It will also prevent the users to delete those fields/objects 
    */

    successHandler(event){
        this.recordId = event.detail.id;     // used to get the Id of current record
    }
}