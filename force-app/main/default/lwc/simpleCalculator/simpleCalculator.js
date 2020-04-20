import { LightningElement, track } from 'lwc';

export default class SimpleCalculator extends LightningElement {
    @track currentResult;
    @track previousResults = [];
    @track showPreviousResults = false;

    firstNumber;
    secondNumber;

    numberChangeHandler(event){
        const inputBoxName = event.target.name;
        if(inputBoxName == 'firstNumber'){
            this.firstNumber = event.target.value;
        }else if(inputBoxName == 'secondNumber'){
            this.secondNumber = event.target.value;
        }
    }

    addHandler(event){
        // HTML textbox always returns a string value, use parseInt() to convert it into an integer
        const firstN = parseInt(this.firstNumber);
        const secondN = parseInt(this.secondNumber);

        //this.currentResult = 'Result of '+firstN+'+'+secondN+' is '+(firstN+secondN);

        // You can also use Modern Javascript 
        // Template Literals are enclosed by the back-tick (` `) or grave accent .
        // Template literals can contain placeholders indicated by the dollar sign and curly braces (${expression}).
        this.currentResult = `Result of ${firstN}+${secondN} is ${firstN+secondN}`;
        
        // use push() method to add an item in an array.
        this.previousResults.push(this.currentResult);
    }

    subHandler(event){
        // HTML textbox always returns a string value, use parseInt() to convert it into an integer
        const firstN = parseInt(this.firstNumber);
        const secondN = parseInt(this.secondNumber);

        //this.currentResult = 'Result of '+firstN+'-'+secondN+' is '+(firstN-secondN);
        
        this.currentResult = `Result of ${firstN}-${secondN} is ${firstN-secondN}`;

        this.previousResults.push(this.currentResult);
    }

    mulHandler(event){
        // HTML textbox always returns a string value, use parseInt() to convert it into an integer
        const firstN = parseInt(this.firstNumber);
        const secondN = parseInt(this.secondNumber);

        //this.currentResult = 'Result of '+firstN+'*'+secondN+' is '+(firstN*secondN);
        
        this.currentResult = `Result of ${firstN}*${secondN} is ${firstN*secondN}`;

        this.previousResults.push(this.currentResult);
    }

    divHandler(event){
        // HTML textbox always returns a string value, use parseInt() to convert it into an integer
        const firstN = parseInt(this.firstNumber);
        const secondN = parseInt(this.secondNumber);

        //this.currentResult = 'Result of '+firstN+'/'+secondN+' is '+(firstN/secondN);

        this.currentResult = `Result of ${firstN}/${secondN} is ${firstN/secondN}`;

        this.previousResults.push(this.currentResult);
    }

    showPreviousResultToggle(event){
        this.showPreviousResults = event.target.checked;
    }
}