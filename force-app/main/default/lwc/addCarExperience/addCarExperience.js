import { LightningElement, api } from 'lwc';
import { ShowToastEvent} from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';  // Here 'lightning' represents namespace and 'uiRecordApi' represents module
import NAME_FIELD from '@salesforce/schema/Car_Experience__c.Name';
import EXPERIENCE_FIELD from '@salesforce/schema/Car_Experience__c.Experience__c';
import CAR_FIELD from '@salesforce/schema/Car_Experience__c.Car__c';
import EXPERIENCE_OBJECT from '@salesforce/schema/Car_Experience__c';

export default class AddCarExperience extends LightningElement {

    /* 
        Before Spring'20, we need to import '@track' decorator to make varible(Primitive data types) reactive
        But After Spring'20 @track decorator is needed for non-primitive e.g. Array, Objects etc. only
        that's why here we have used @track decorator for carsArray 
    */
    expTitle='';
    expDescription='';

    /* Public properties are annotated with @api decorator to expose it to parent component i.e. Parent to Child communication */
    /*
        Use @api decorator to define public properties in your component. Values of these properties can be 
        supplied by parent component but you can also set default value
        public properties are reactive. Updating a new value in parent component, automatically updates child component.
        Use public properties whenever you need to pass values from one component to another.
    */
    @api carId;

    handleTitleChange(event){
        this.expTitle = event.target.value;  // TO get the Title
    }

    handleDescriptionChange(event){
        this.expDescription = event.target.value;   // To get the Description
    }

    addExperience(){
        /*
        Giving hard reference to the fields or objects is always preferred as it will automatically pickup the changes
        when you modify your fields or objects. 
        It will also prevent the users to delete those fields/objects 
        */
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.expTitle;
        fields[EXPERIENCE_FIELD.fieldApiName] = this.expDescription;
        fields[CAR_FIELD.fieldApiName] = this.carId;

        const recordInput = {apiName : EXPERIENCE_OBJECT.objectApiName, fields};

        /*
            createRecord(recordInput: Record): Promise<Record>
            The createRecord(recordInput) method returns a Promise object that resolves when the record is created. 
            To return record data back to the component, use the then() block. Handle errors using the catch() block. 
        */
        createRecord(recordInput).then(carExperience => {
            this.showToast('SUCCESS', 'Experience Record Updated', 'success');
        }).catch(error => {
            this.showToast('ERROR', error.body.messsage, 'error');
        })

    }

    showToast(title, message, variant){
        // This is used to show notification
        const toastEvent = new ShowToastEvent({
            title : title,
            message : message,
            variant : variant
        });
        this.dispatchEvent(toastEvent);
    }
}