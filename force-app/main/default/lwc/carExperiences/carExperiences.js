import { LightningElement, api, track } from 'lwc';
import getExperiences from '@salesforce/apex/CarExperience.getExperiences';
import { ShowToastEvent} from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class CarExperiences extends LightningElement {

    // @api carId;
    privateCarId;
    /*
        @wire : Here we are not using wire Adapter because Apex method is not cacheable.
        There is chances of getting old data if we will use cacheable methods.
    */
    @api
    get carId(){
        return this.privateCarId;
    }
    set carId(value){
        this.privateCarId = value;
        this.getCarExperiences();
    }

    @track carExperiences = [];

    connectedCallback(){
        this.getCarExperiences();
    }

    /* 
        Here we make method public using @api decorator to get called from parent
        component 'carDetails'
    */
    @api
    getCarExperiences(){
        getExperiences({carId: this.privateCarId}).then( experiences => {
            this.carExperiences = experiences;
        }).catch(error => {
            this.showToast('ERROR', error.body.message, 'error');
        })
    }

    userClickHandler(event){
        const userId = event.target.getAttribute("data-userid");
        // Navigating to User record details
        this[NavigationMixin.Navigate]({
            type : "standard__recordPage",
            attributes : {
                recordId : userId,
                objectApiName : "User",
                actionName : "view"
            }
        });
    }


    get hasExperiences(){
        if(this.carExperiences.length > 0){
            return true;
        }
        return false;
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