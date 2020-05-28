import { LightningElement, api, wire, track } from 'lwc';
import getCar from '@salesforce/apex/CarSearchResultController.getCars';
import { ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class CarSearchResult extends LightningElement {

    @api carTypeId;

    @track carsArray;

    /*
     if we are using '{carTypeId : this.carTypeId}' we will get [cannot read property 'carTypeId' of undefined]
     this is because maybe wire adapter may get fired before component initialisation
     To remove this error and to make 'carTypeId' reactive we can use '{carTypeId : '$carTypeId'}'
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


}