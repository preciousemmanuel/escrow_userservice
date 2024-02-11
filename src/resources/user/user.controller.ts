import { Request, Response, NextFunction, Router } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware";
import UserService from "@/resources/user/user.service";
import validate from "@/resources/user/user.validation";
import httpcode from "@/utils/httpcode";
import Token from "@/utils/interfaces/token.interface";
import { verifyToken } from "@/utils/token";
import jwt,{verify} from "jsonwebtoken";
import { responseObject } from "@/utils/http.response";


class UserController implements Controller {
    public path = "/user";
    public router = Router();
    private userService=new UserService();

    constructor() {
        this.initializeRoute();
    }

    initializeRoute(): void {
        this.router.post(
            `${this.path}/signup`,
            validationMiddleware(validate.signup),
            this.signup
        )
        this.router.get(
            `${this.path}/verify-token/:token`,
           
            this.verifyToken
        )
    }

    private verifyToken = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {

        try {
            const {token}=req.params;
            if (!token) {
            next(new HttpException(httpcode.HTTP_FORBIDDEN, "Something went wrong"))
                
            }
            const payload:Token|jwt.JsonWebTokenError=await verifyToken(token);
            if(payload instanceof jwt.JsonWebTokenError ){
                // return res.status(401).json({error:"Unauthorized"});
                return next(new HttpException(httpcode.HTTP_FORBIDDEN,"Unauthorized"));
        
            }

            return responseObject(res, httpcode.HTTP_OK, "success", "Token verified", payload);

        } catch (error) {
            console.log("validateerror -", error);
            next(new HttpException(httpcode.HTTP_FORBIDDEN, "Something went wrong"))
        }
    }

    private signup = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {

        try {

        } catch (error) {
            next(new HttpException(400, "Something went wrong"))
        }
    }
}

export default UserController;