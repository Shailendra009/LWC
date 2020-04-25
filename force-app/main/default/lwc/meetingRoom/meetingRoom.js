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

}