import { LightningElement, track } from 'lwc';

export default class HelloWorld extends LightningElement {
    // @track is used for Data binding from JS to HTML 
    @track dynamicGreeting = 'World';       // Properties decorated with @track, creates a one way data binding
                                            // between JS Controller and Template(.html) file (i.e. JS to html file). 
                                            // Template would auto renderer if property value changes in JS.
    
    // Event Handler is used to create Data binding from Template(HTML) to JS Controller
    greetingChangeHandler(event){        // browser event as parameter to hold the value of lightning input
        this.dynamicGreeting = event.target.value;      
    }
}