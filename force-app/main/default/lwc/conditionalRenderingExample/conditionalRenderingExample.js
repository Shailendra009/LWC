import { LightningElement, track } from 'lwc';

export default class ConditionalRenderingExample extends LightningElement {
    @track displayDiv = false;
    @track cityList = ['Delhi', 'Mumbai', 'Kolkata', 'Chennai'];
    showDivHandler(event){
        this.displayDiv = event.target.checked;
    }
}