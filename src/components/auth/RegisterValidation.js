function Validation(values){
    
    console.log(values.name+' : '+values.email+' : '+values.password);
    let error = {};
    
    
    if(values.name === ""){
        error.name = "Please enter name";
    }else{
        error.name = "";
    }
    
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