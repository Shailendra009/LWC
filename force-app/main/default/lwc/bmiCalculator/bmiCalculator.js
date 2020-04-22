import { LightningElement, track } from 'lwc';

export default class BmiCalculator extends LightningElement {
    // Private Properties are non-reactive in nature, which means they don't create data binding and doesn't 
    // update template on their value change
    cardTitle = 'BMI Calculator';

    changePrivatePropertyHandler(){
        this.cardTitle = 'Changed Value';
        console.log('Value : ',this.cardTitle);
    }

    // Private Properties can be made reactive by using @track decorator which develops data binding behind 
    // the scene and update the template on their value change
    weight;
    height;
    @track bmi;
    onWeightChange(event){       // inputbox returns string value thats why we need to parse it into Float value
        this.weight = parseFloat(event.target.value);
    }
    onHeightChange(event){
        this.height = parseFloat(event.target.value);
    }
    calculateBMI(){
        try{
            this.bmi = this.weight / (this.height * this.height);
        }catch(error){
            this.bmi = undefined;
        }   
    }
    
    // Javascript getters can be used to compute the value of property.
    get bmiValue(){
        if(this.bmi == undefined){
            return "";
        }else{
            return `Your BMI is ${this.bmi}`;
        }
    }

}