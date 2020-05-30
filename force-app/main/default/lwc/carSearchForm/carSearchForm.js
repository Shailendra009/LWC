import { LightningElement, wire, track } from 'lwc';
import getCarType from '@salesforce/apex/CarSearchFormController.getCarTypes';  // 'getCarType' can be same or different from actual method name 'getCarTypes'
import { ShowToastEvent} from 'lightning/platformShowToastEvent';
import {NavigationMixin} from 'lightning/navigation';


export default class CarSearchForm extends NavigationMixin(LightningElement) {
    
    /* 
        Before Spring'20, we need to import '@track' decorator to make varible(Primitive data types) reactive
        But After Spring'20 @track decorator is needed for non-primitive e.g. Array, Objects etc. only
        that's why here we have used @track decorator for carTypes array but not for selectedValue
    */
    @track carTypes = [];      
    selectedValue = 'All Types';


    /*
        Apex Method must be 'cacheable' to get called through 'Wire Adapter'.
        Here 'wiredCarTypes' holds the value return from 'getCarTypes' methods. 
        The Wire service either provisions the list of wiredCarTypes to the 'wiredCarTypes.data' property,
            or returns an error to the 'wiredCarTypes.error' property
    */

    @wire(getCarType) 
    wiredCarTypes({data, error}){
        if(data){
            this.carTypes = [{value:'', label:'All Types'}];
            data.forEach(element => {
                const carType = {};
                carType.value = element.Id;         // here you can't use this.carType.value instead of 'carType.value'
                carType.label = element.Name;
                this.carTypes.push(carType);
            });
            this.showToast('Success', 'Car Types Loaded', 'success');
        }else if(error){
            this.showToast('ERROR', error.body.messsage, 'error');
        }

    }
    

    handleCarTypeChange(event){  // used to handle picklist values on change
        const carTypeId = event.detail.value;       // to get the Id of selected value of picklist
        this.selectedValue = event.target.options.find(opt => opt.value === event.detail.value).label;    // to get the label of selected value of picklist

        /* 
            Defined and fired the event to pass the carTypeId to parent component
            'cartypeselect' is the name of the Event which holds 'carTypeId' as parameter
            'cartypeselect' Event is fired using 'dispatchEvent()' method and will be handled in their parent component
        */
        // Declare/Register the Custom event
        const carTypeSelectionChangeEvent = new CustomEvent('cartypeselect',{detail: carTypeId});
        /* 
            'cartypeselect' : Name of event
            {detail: carTypeId} : Parameter to pass 
            can also use 'bubbles:true'  To allow your event to bubbles up to parent component
        */
        // Fire/Dispatch the event
        this.dispatchEvent(carTypeSelectionChangeEvent);
        /* 
            Event can be handled in two ways:
                One way is to handle in component tag(markup). Append 'on' keyword before your event name in markup
                We can also handle in js file (to handle based on some condition)
            
            Custom Events can only be handled by the component itself or the parent component
            Custom Event is same as 'Component Event' in Lightning Component
        */
    }

    createNewCarType(){
        // create page reference to navigate to corresponding page('New' Page of 'Car Type' object)
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes:{
                objectApiName: 'Car_Type__c',
                actionName: 'new'
            }
        });

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