import { cleanEnv,str,port } from "envalid";

function validateEnv():void{
    cleanEnv(process.env,{
        NODE_ENV:str({
            choices:['dev','prod']
        }),
        MONGO_URI:str(),
        JWT_SECRET:str(),
        RABIT_URL:str(),

        PORT:port({default:3000})
    })
}

export default validateEnv;