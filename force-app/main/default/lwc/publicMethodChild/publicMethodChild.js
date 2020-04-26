import { LightningElement, track, api } from 'lwc';

export default class PublicMethodChild extends LightningElement {
    @track value = ['Black'];

    options = [
            { label: 'Black Marker', value: 'Black' },
            { label: 'Green Marker', value: 'Green' },
            { label: 'Red Marker', value: 'Red' },
            { label: 'Blue Marker', value: 'Blue' }
        ];

    @api
    selectCheckbox(checkboxValue){
        const selectedCheckbox = this.options.find(checkbox => {
            return checkboxValue === checkbox.value;
        })

        if(selectedCheckbox){
            this.value = selectedCheckbox.value;
            return "Successfully checked";
        }
        return "No checkbox found";
    }

}