import { Schema,model } from "mongoose";


import Otp from "@/resources/otp/otp.interface";



const OtpSchema=new Schema({
    value:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    isValidated:{
        type:Boolean,
        default:false
    }
   
   

},
{timestamps:true}
);


export default model<Otp>("Otp",OtpSchema)