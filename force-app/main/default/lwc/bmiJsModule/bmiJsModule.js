const getBMI = function (weightInKg, heightInMtr) {
    try{
        return  weightInKg / (heightInMtr * heightInMtr);
    }catch(error){
        return undefined;
    }   
}

export{                 // After exporting getBMI method, this can be used in other component by importing this method  
    getBMI
};