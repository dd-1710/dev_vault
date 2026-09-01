export const loginValidate = (name,value)=>{
  switch(name){
    case "userName":
        if(value === ''){
            return "Username is required";
        }
        else if(!/^[A-Za-z][A-Za-z0-9_]*$/.test(value)){
           return "User name can only start with letter and can contain underscore and numbers"
        }
        else if(value.length < 4 ){
            return "Username cannot be less than 4 characters";
        }
         else if(value.length > 25 ){
            return "Username cannot be greater than 25 characters";
        }
        
        return '';
    case "password":
        if(value === ''){
           return "Password is required";
        }else if(value.length < 4){
            return "Password length cannot be less than 4 characters";
        }
        else if(value.length > 12){
            return "Password length cannot be greater than 12 characters";
        }
        return "";
    default :
        return "";
  }
}