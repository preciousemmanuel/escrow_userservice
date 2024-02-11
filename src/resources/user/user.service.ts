import User from "@/resources/user/user.interface";
import UserModel from "@/resources/user/user.model";
import { checkIfIsEmail } from "@/utils/helpers";
import logger from "@/utils/logger";


class UserService {
 private user=UserModel;
 
 public async create(
    
    value:string,
    country:string
    
 ):Promise<User|Error>{

try {
    //do some checkings
    const isEmail:boolean=checkIfIsEmail(value);

    let payload:any={country};
    if(isEmail){
        payload.email=value;
    }else{
        payload.phone=value;

    }

  const createdUser  =await this.user.create(payload);
  return createdUser;
    
} catch (error:any) {
logger.error(`CannotCreateUSer - ${error.toString()}`);
    throw new Error(`cannnot create user ${error.toString()} `);
}

 }





public async getUserById(id:string):Promise<User|null|Error>{
    try {
        const user=await this.user.findById(id);  
        if (!user) {
            return null
        }
        return user;
    } catch (error:any) {
        logger.error(`userNotFound-${error.toString()}`);
       throw new Error("Something went wrong") 
    }


}



public async getUserByPhoneOrEmail(data:string):Promise<User|null|Error>{
    try {
        const user=await this.user.findOne({
            $or:[
                {
                    email:data
                },
                {
                    phone:data
                }
            ]
        });  
        if (!user) {
            return null
        }
        return user;
    } catch (error:any) {
        logger.error(`userNotFound-${error.toString()}`);
       throw new Error("Something went wrong") 
    }


}
}

export default UserService;