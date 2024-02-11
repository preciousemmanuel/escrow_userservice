import { Document } from "mongoose";

interface User extends Document{
    email?:string,
    name:string,
    device?:string,
    phone?:string,
    country:string,
    blocked:boolean
    

}

export default User;