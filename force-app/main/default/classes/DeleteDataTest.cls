/*
    Test Class to delete Test Data
*/

@isTest(seeAllData=true)
public class DeleteDataTest {

    @isTest
    public static void deleteData(){
        DeleteData.deleteData();
    }
}