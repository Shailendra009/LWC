import { LightningElement, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';  // Here 'lightning' represents namespace and 'uiRecordApi' represents module
import { registerListener, unregisterAllListeners } from 'c/pubsub';    // To use 'registerListener' and 'unregisterAllListeners' method of pubsub module
import { CurrentPageReference } from 'lightning/navigation';            // To get the actual page reference

import CAR_ID from '@salesforce/schema/Car__c.Id';
import CAR_NAME from '@salesforce/schema/Car__c.Name';
import CAR_MILEAGE from '@salesforce/schema/Car__c.Mileage__c';
import CAR_PER_DAY_RENT from '@salesforce/schema/Car__c.Per_Day_Rent__c';
import CAR_BUILD_YEAR from '@salesforce/schema/Car__c.Build_Year__c';
import CAR_PICTURE from '@salesforce/schema/Car__c.Picture__c';
import CAR_CONTACT_NAME from '@salesforce/schema/Car__c.Contact__r.Name';
import CAR_CONTACT_EMAIL from '@salesforce/schema/Car__c.Contact__r.Email';
import CAR_CONTACT_PHONE from '@salesforce/schema/Car__c.Contact__r.HomePhone';
import CAR_CARTYPE_NAME from '@salesforce/schema/Car__c.Car_Type__r.Name';

    /*
        Giving hard reference to the fields or objects is always preferred as it will automatically pickup the changes
        when you modify your fields or objects. 
        It will also prevent the users to delete those fields/objects 
    */
const fieldsArray = [
    CAR_ID,
    CAR_NAME,
    CAR_MILEAGE,
    CAR_PER_DAY_RENT,
    CAR_BUILD_YEAR,
    CAR_PICTURE,
    CAR_CONTACT_NAME,
    CAR_CONTACT_EMAIL,
    CAR_CONTACT_PHONE,
    CAR_CARTYPE_NAME
];

export default class CarDetails extends LightningElement {

    /* 
        Before Spring'20, we need to import '@track' decorator to make varible(Primitive data types) reactive
        But After Spring'20 @track decorator is needed for non-primitive e.g. Array, Objects etc. only
    */
    carId;
    selectedTabValue;

    /* 
        'getRecord' wire adapter is used to get a record’s data using LDS.
        The framework can pass the values to 'objectApiName' and 'recordId' property only on 'App Builder Record Page'.
        The value of 'objectApiName' and 'recordId' on 'App Builder Home Page' and 'App Builder App Page' will be null.
    */
    @wire(getRecord, {recordId : '$carId', fields : fieldsArray })
    car;

    @wire(CurrentPageReference) pageRef;    // current page reference

    /* 
       LWC have a lifecycle managed by the framework. The framework creates components, inserts them into the DOM, renders them, and removes them from the DOM.
       The constructor() method fires when a component instance is created.
       connectedCallback() lifecycle hook fires when a component is inserted into the DOM. 
       disconnectedCallback() lifecycle hook fires when a component is removed from the DOM.
       renderedCallback() is used to perform logic after a component has finished the rendering phase.
    */
    connectedCallback(){
        /** 
            Listening/handling 'carselect' pubsub event fired by 'carTile' independent component
            'carselect' : Name of the Event that we want to listen
            this.callBackMethod : callBack/function to invoke when said event is fired.
            this : current object or instance
        */
        registerListener('carselect', this.callBackMethod, this);
    }

    callBackMethod(payload){    // here 'payload' will hold 'car Id' sent by 'carTile' component using 'carselect' pubsub event
        this.carId = payload;
    }

    disconnectedCallback(){
        /**
         *  To destroy all the listeners when component is removed from the DOM
         */
        unregisterAllListeners(this);
    }

    tabChangeHandler(event){
        this.selectedTabValue = event.target.value;   // to get the value of selected tab
    }

    /**
     * Here getter is used to return true to the markup if there is data returned from the server
     */
    get carFound(){
        if(this.car.data){
            return true;
        }
        return false;
    }

    /* 
        Calling child component (carExperiences) method 'getCarExperiences' from parent component 'carDetails' using @api decorator
    */
    experienceAddedHandler(){
        const carExperienceComponent = this.template.querySelector('c-car-experiences');
        if(carExperienceComponent){
            carExperienceComponent.getCarExperiences();
        }

        this.selectedTabValue = "viewexperiencestab";
    }
}