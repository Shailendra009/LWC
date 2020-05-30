import { LightningElement } from 'lwc';

export default class CarSearch extends LightningElement {
    
    /* 
        Before Spring'20, we need to import '@track' decorator to make varible(Primitive data types) reactive
        But After Spring'20 @track decorator is needed for non-primitive e.g. Array, Objects etc. only
    */
    carTypeId;

    carTypeSelectHandler(event){        // This is fired from child component 'carSearchForm'
        this.carTypeId = event.detail;  // Assigning carTypeId using CustomEvent 'cartypeselect' which is fired from child component 'carSearchForm'
    }
}