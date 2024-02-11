import { Document } from "mongoose";

interface Otp extends Document{
    value:string,
    user:string,
    isValidated:boolean
   
    

}

export default Otp;