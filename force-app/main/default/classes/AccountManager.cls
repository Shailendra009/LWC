public with sharing class AccountManager {
    
    @AuraEnabled(cacheable=true)     // 'cacheable=true' is used to get method called through wire adapter

    public static List<Account> getAccounts(){
        return [SELECT Id, Name, Phone FROM Account LIMIT 10];
    }

}
