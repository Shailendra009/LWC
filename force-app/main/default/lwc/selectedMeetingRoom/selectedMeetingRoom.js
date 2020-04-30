import { LightningElement, track, wire } from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubsub';   // To use 'fireEvent' method of pubsub module
import { CurrentPageReference } from 'lightning/navigation';  // To get the actual page reference

export default class SelectedMeetingRoom extends LightningElement {
    @track SelectedMeetingRoom = {};

    @wire(CurrentPageReference) pageRef;

    connectedCallback(){
        registerListener('pubsubtileclick', this.onMeetingRoomSelectHandler, this);
    }

    // unregister all listeners from current page which we can call from disconnectedCallback lifecycle
    // disconnectedCallback is called when component gets destroyed
    disconnectedCallback(){
        unregisterAllListeners(this);  // this refers to the current object
    }

    onMeetingRoomSelectHandler(payload){
        this.SelectedMeetingRoom = payload;
    }
}