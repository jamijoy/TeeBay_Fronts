function Validation(values){
    
    console.log(values.email+' : '+values.password);
    let error = {};
    
    if(values.email === ""){
        error.email = "Please enter a mail address";
    }else{
        error.email = "";
    }
    
    if(values.password === ""){
        error.password = "Please enter a valid password";
    }else{
        error.password = "";
    }
    
    return error;
}

export default Validation;