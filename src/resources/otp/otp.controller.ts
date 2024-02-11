import { Request, Response, NextFunction, Router } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware";
import OtpService from "@/resources/otp/otp.service";
import validate from "./otp.validation";
import httpcode from "@/utils/httpcode";
import { responseObject } from "@/utils/http.response";



class OtpController implements Controller {
    public path = "/otp";
    public router = Router();
    private otpService=new OtpService();

    constructor() {
        this.initializeRoute();
    }

    initializeRoute(): void {
        this.router.post(
            `${this.path}/create`,
            validationMiddleware(validate.create),
            this.create
        ),
        this.router.post(
            `${this.path}/verify`,
            validationMiddleware(validate.verify),
            this.verify
        )
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {

        try {
            const {value}=req.body;
         const otp=  await this.otpService.create(value);

         return responseObject(res, httpcode.HTTP_CREATED, "success", "Otp sent successfully", otp);
         

        } catch (error:any) {
            next(new HttpException(httpcode.HTTP_BAD_REQUEST, error.message))
        }
    }

    private verify = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {

        try {
            const {value,code}=req.body;
         const response=  await this.otpService.validate(code, value);

         return responseObject(res, httpcode.HTTP_CREATED, "success", "Otp verified successfully", response);
         

        } catch (error:any) {
            next(new HttpException(httpcode.HTTP_BAD_REQUEST, error.message))
        }
    }
}

export default OtpController;