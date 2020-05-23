import { LightningElement, wire, track } from 'lwc';
import getCarType from '@salesforce/apex/CarSearchFormController.getCarTypes';  // 'getCarType' can be same or different from actual method name 'getCarTypes'
import { ShowToastEvent} from 'lightning/platformShowToastEvent';
import {NavigationMixin} from 'lightning/navigation';


export default class CarSearchForm extends NavigationMixin(LightningElement) {
    
    /* 
        Before Spring'20, we need to import '@track' decorator to make varible(Primitive data types) reactive
        After Spring'20 @track decorator can be used for non-primitive e.g. Array, Objects etc.
        that's why here we have used @track decorator for carTypes array but not for selectedValue
    */
    @track carTypes = [];      
    selectedValue = 'All Types';



    /*
        Method must be 'cacheable' to get called through 'Wire Adapter'.
        Here 'wiredCarTypes' holds the value return from 'getCarTypes' methods. 
        The Wire service either provisions the list of accounts to the 'wiredCarTypes.data' property,
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
            //console.log("Response from server: "+this.carTypes.label);
            this.showToast('Car Types loaded', data.label +' : Car Types Loaded', 'success');
        }else if(error){
            this.showToast('ERROR', error.body.messsage, 'error');
        }

    }
    

    handleCarTypeChange(event){
        const carTypeId = event.detail.value;       // to get the Id of selected value of picklist
        this.selectedValue = event.target.options.find(opt => opt.value === event.detail.value).label;    // to get the label of selected value of picklist

        /* 
            Defined and fired the event to pass the carTypeId to parent component
            'cartypeselect' is the name of the Event which holds 'carTypeId' as parameter
            'cartypeselect' Event is fired using 'dispatchEvent()' method and will be handled in their parent component
        */
        const carTypeSelectionChangeEvent = new CustomEvent('cartypeselect',{detail: carTypeId});
        this.dispatchEvent(carTypeSelectionChangeEvent);

    }

    createNewCarType(){
        // create page reference to navigate to corresponding page
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