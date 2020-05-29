import { LightningElement, api } from 'lwc';

export default class CarTile extends LightningElement {

    @api car;
    @api selectedCarId;  // used to accept carId from their parent component

    handleCarSelect(event){
        event.preventDefault();   // This is used to prevent to redirect to the same page
        const carId = this.car.Id;

        /*
            Here we are using CustomEvent 'carselect' to pass 'carId' to their parent component 'carSearchResult' which
            will be handled through parent component
        */
        const carSelect = new CustomEvent('carselect', {detail : carId});
        this.dispatchEvent(carSelect);
    }

    get isCarSelected(){
        if(this.car.Id === this.selectedCarId){
            return "tile selected"
        }
        return "tile";
    }
}