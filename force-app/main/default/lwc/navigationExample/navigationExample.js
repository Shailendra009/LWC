import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class NavigationExample extends NavigationMixin(LightningElement) {

    // For standard apps, the namespace is "standard__". For custom apps, it’s "c__"

    openWebPage(){
        this[NavigationMixin.Navigate]({
            type : 'standard__webPage',
            attributes : {
                url : 'https://login.salesforce.com/'
            }
        });
    }

    openAccountHome(){
        this[NavigationMixin.Navigate]({
            type : 'standard__objectPage',
            attributes : {
                objectApiName : 'Account',
                actionName : 'home'
            }
        });
    }

    createNewContact(){
        this[NavigationMixin.Navigate]({
            type : 'standard__objectPage',
            attributes : {
                objectApiName : 'Contact',
                actionName : 'new'
            }
        });
    }

    openOppListView(){
        this[NavigationMixin.Navigate]({
            type : 'standard__objectPage',
            attributes : {
                objectApiName : 'Opportunity',
                actionName : 'list'
            },
            state: {
                filterName: 'Recent'
          }
        });
    }

    openCaseRecord(){
        this[NavigationMixin.Navigate]({
            type : 'standard__recordPage',
            attributes : {
                recordId : '5002x000002SW59AAG',
                objectApiName : 'Case',    // 'objectApiName' is optional
                actionName : 'view'         // 'actionName' can be 'new' and 'edit' also
            }
        });
    }

    openMeetingRoomTab(){
        this[NavigationMixin.Navigate]({
            type : 'standard__navItemPage',
            attributes : {
                apiName : 'Meeting_Room'   
            }
        });
    }

    previewFile(){
        this[NavigationMixin.Navigate]({
            type : 'standard__namedPage',
            attributes : {
                pageName : 'filePreview'   
            },
        /*    state : {
                recordIds : '',
                selectedRecordId : ''
            }  */
        });
    }

}