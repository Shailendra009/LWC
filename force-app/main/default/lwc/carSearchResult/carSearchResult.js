import { LightningElement, api, wire, track } from 'lwc';
import getCar from '@salesforce/apex/CarSearchResultController.getCars';
import { ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class CarSearchResult extends LightningElement {

    /* Public properties are annotated with @api decorator to expose it to parent component i.e. Parent to Child communication */
    @api carTypeId;

    /* 
        Before Spring'20, we need to import '@track' decorator to make varible(Primitive data types) reactive
        After Spring'20 @track decorator can be used for non-primitive e.g. Array, Objects etc.
        that's why here we have used @track decorator for carsArray 
    */
    @track carsArray;
    selectedCarId;

    /*
     if we are using '{carTypeId : this.carTypeId}' we will get [cannot read property 'carTypeId' of undefined]
     this is because maybe wire adapter may get fired before component initialisation
     To remove this error and to make 'carTypeId' reactive we can use '{carTypeId : '$carTypeId'}'
     */

     /*
        Method must be 'cacheable' to get called through 'Wire Adapter'.
        Here 'WiredCars' holds the value return from 'getCars' methods. 
        The Wire service either provisions the list of WiredCars to the 'WiredCars.data' property,
            or returns an error to the 'WiredCars.error' property
    */

    @wire(getCar, {carTypeId : '$carTypeId'})   
    WiredCars({data, error}){    // This can only hold 'data' and 'error' as parameter
        if(data){
            this.carsArray = data;
        }else if(error){
            this.showToast('ERROR', error.body.messsage, 'error');
        }
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

    get carsFound(){
        if(this.carsArray){
            console.log('Cars Available'+JSON.stringify(this.carsArray));
            console.log('CarTypeId : '+this.carTypeId);
            return true;
        }
        console.log('Cars Not Available'+JSON.stringify(this.carsArray));
        console.log('CarTypeId : '+this.carTypeId);
        return false;
    }

    carSelectHandler(event){
        const carId = event.detail;   // to get 'carId' from child component 'carTile'
        this.selectedCarId = carId;
    }


}