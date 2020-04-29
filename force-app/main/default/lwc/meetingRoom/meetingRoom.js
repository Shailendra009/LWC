import { LightningElement, api } from 'lwc';

export default class MeetingRoom extends LightningElement {

// public properties are reactive. Updating a new value in parent component, automatically updates child component.
// Use public properties whenever you need to pass values from one component to another.

    @api meetingRoomInfo;  //{roomName:'A-01', roomCapacity:'10'}

// Use @api decorator to define public properties in your component. Values of these properties can be 
// supplied by parent component but you can also set default value
// e.g. Here we can set default value for 'meetingRoomInfo' and can not modify it later on. 
// These values can come from parent component(meetingRooms).

    @api showRoomInfo = false;
    tileClickHandler(){
        // Declare/Register the event
        const tileClicked = new CustomEvent('tileclick', {detail: this.meetingRoomInfo, bubbles : true});
        // 'tileclick': Name of event
        // {detail:''}: Parameter to pass 
        // bubbles:true   To allow your event to bubbles up to parent component

        // Fire/Dispatch the event
        this.dispatchEvent(tileClicked);
        // Event can be handled in two ways
        // one way is to handle in component tag(markup). Append 'on' keyword before your event name in markup
        // you can also handle in js file (to handle based on some condition)

        // Custom Events can only be handled by the component itself or the parent component
        // Custom Event is same as 'Component Event' in Lightning Component 
    }

}