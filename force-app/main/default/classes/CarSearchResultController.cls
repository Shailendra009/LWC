public with sharing class CarSearchResultController {
    
    @AuraEnabled(cacheable=true)
    public static List<Car__c> getCars(String carTypeId){
        if(String.isEmpty(carTypeId)){
            return [SELECT Id, Name, Picture__c, Geolocation__Latitude__s, Geolocation__Longitude__s, Contact__r.Name 
                    FROM Car__c 
                    WHERE Available_For_Rent__c = true ];
        }else {
            return [SELECT Id, Name, Picture__c, Geolocation__Latitude__s, Geolocation__Longitude__s, Contact__r.Name 
                    FROM Car__c 
                    WHERE Available_For_Rent__c = true 
                    AND Car_Type__c =: carTypeId];
        }
    }

}
