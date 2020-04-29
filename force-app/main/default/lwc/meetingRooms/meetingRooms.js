import { LightningElement, track } from 'lwc';

export default class MeetingRooms extends LightningElement {
    
    @track selectedMeetingRoom;
    
    meetingRoomInfo = [
        {roomName:'A-01', roomCapacity:'10'},
        {roomName:'A-02', roomCapacity:'12'},
        {roomName:'A-03', roomCapacity:'9'},
        {roomName:'B-01', roomCapacity:'7'},
        {roomName:'B-02', roomCapacity:'6'}
    ];

    onTileSelectHandler(event){
        const currentMeetingRoomInfo = event.detail;
        this.selectedMeetingRoom = currentMeetingRoomInfo.roomName;
    }

    // To handle event at time of component creation we use constructor
    // super() keyword should be the 1st statement in constructor
    constructor(){
        super();
        this.template.addEventListener('tileclick', this.onTileSelectHandler.bind(this));
    }

}