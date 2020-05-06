public with sharing class AccountManager {
    
    // @AuraEnabled(cacheable=true)     // 'cacheable=true' is used to get method called through wire adapter

    @AuraEnabled

    public static List<Account> getAccounts(Integer numberOfRecords){

        return [SELECT Id, Name, Phone FROM Account LIMIT : numberOfRecords];

    }

}
