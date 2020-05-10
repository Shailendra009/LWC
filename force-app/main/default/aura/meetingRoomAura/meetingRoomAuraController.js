({
    doInit : function(component, event, helper) {
        component.set("v.meetingRoomInfo", [
            {roomName:'A-01', roomCapacity:'10'},
            {roomName:'A-02', roomCapacity:'12'},
            {roomName:'A-03', roomCapacity:'9'},
            {roomName:'B-01', roomCapacity:'7'},
            {roomName:'B-02', roomCapacity:'6'}
        ]);
    },

    handleTileClick : function(component, event, helper){
        component.set("v.selectedMeetingRoom", event.getParam('roomName'));
    }
})
