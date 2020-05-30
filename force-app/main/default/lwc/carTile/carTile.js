import { LightningElement, api, wire } from 'lwc';
import { fireEvent } from 'c/pubsub';   // To use 'fireEvent' method of pubsub module
import { CurrentPageReference } from 'lightning/navigation';  // To get the actual page reference

export default class CarTile extends LightningElement {

    /*
        Use @api decorator to define public properties in your component. Values of these properties can be 
        supplied by parent component but you can also set default value
        public properties are reactive. Updating a new value in parent component, automatically updates child component.
        Use public properties whenever you need to pass values from one component to another.
    */
    @api car;           // used to get car details from their parent component
    @api selectedCarId;  // used to accept carId from their parent component

    @wire(CurrentPageReference) pageReference;   // current page reference

    handleCarSelect(event){
        event.preventDefault();   // This is used to prevent to redirect to the same page
        const carId = this.car.Id;

        /*
            Here we are using CustomEvent 'carselect' to pass 'carId' to their parent component 'carSearchResult' which
            will be handled through parent component
            CustomEvent can only be handled/listened by their parent component or by the component itself
        */
       // Declare/Register the Custom event
        const carSelect = new CustomEvent('carselect', {detail : carId});
        /* 
            'carselect': Name of event
            {detail:carId}: Parameter to pass 
            can also use 'bubbles:true'  To allow your event to bubbles up to parent component
        */
        // Fire/Dispatch the event
        this.dispatchEvent(carSelect);
        /* 
            Event can be handled in two ways:
                One way is to handle in component tag(markup). Append 'on' keyword before your event name in markup
                We can also handle in js file (to handle based on some condition)
            
            Custom Events can only be handled by the component itself or the parent component
            Custom Event is same as 'Component Event' in Lightning Component
        */

        /*
            Firing/Publish 'carselect' event using 'fireEvent' method of 'pubsub' module which will be listen/handle by 'carDetail' independent component
            'this.pageReference' : Page reference
            'carselect' : Name of the Event
            'this.car.Id' : parameter or payload

            'pubsub' model is same like 'Application Event' in lightning Aura component.
            There are two ways to communicate between independent component (i.e. components that aren’t in the same DOM tree):
                1. publish-subscribe pattern (pubsub model)
                2. Lightning message channel
            To communicate between components on a single page, you can use the pubsub module.
                For example, if you add two components to a Lightning page in Lightning App Builder, use the pubsub module to send events between them. 
                The pubsub module restricts events to a single page.
            'Lightning message channel' : To communicate between components within a single Lightning page or across multiple pages.
        */
        fireEvent(this.pageReference, 'carselect', this.car.Id);

    }

    /**
     * Here getter is used to return "tile selected" to the markup if the selected car Id matches
     */
    get isCarSelected(){
        if(this.car.Id === this.selectedCarId){   // '===' used to compare both values and datatype where '==' used for values only
            return "tile selected"
        }
        return "tile";
    }
}