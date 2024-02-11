import { Schema,model } from "mongoose";
import bcrypt from "bcrypt";

import User from "./user.interface";


const UserSchema=new Schema({
    name:{
        type:String,
       
    },
    phone:{
        type:String,
        
    },
    email:{
        type:String,
        
    },
    device:{
        type:String,
        
    },
    country:{
        type:String
    },
    blocked:{
        type:Boolean
    }

},
{timestamps:true}
);

// UserSchema.pre<User>("save", async function(next:any){
//     if (!this.isModified("password")) {
//         return next
//     }
//     const hash= await bcrypt.hash(this.password,10);
//     this.password=hash;
//     next();
// })

// UserSchema.methods.isValidPAssword=async function(
//     password:string
// ): Promise<Error|boolean>{
// return await bcrypt.compare(password,this.password);
// }
export default model<User>("User",UserSchema)