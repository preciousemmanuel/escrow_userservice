import Otp from "@/resources/otp/otp.interface";
import OtpModel from "@/resources/otp/otp.model";
import { checkIfIsEmail, verificationCode } from "@/utils/helpers";
import UserService from "@/resources/user/user.service";
import { createToken } from "@/utils/token";
import User from "@/resources/user/user.interface";
import Data from "@/utils/data";
import mqConnection from "@/utils/queue/connect.queue";
import { SEND_EMAIL } from "@/utils/queue/type.queue";




class OtpService {
    private otp = OtpModel;

    public async create(
        user: string,

    ): Promise<String | Error> {

        try {
            const code = verificationCode();
            await this.otp.create({
                user,
                value: code
            });

            const checkIsEmail = checkIfIsEmail(user);
            if (checkIsEmail) {
                const emailData = {
                    to: user,
                    subject: "Verification Code",
                    html: `Your OTP is ${code} `,
                };
                mqConnection.sendToQueue(SEND_EMAIL, emailData);
            } else {

            }


            return code.toString();

        } catch (error: any) {
            throw new Error(error.toString());
        }

    }


    public async validate(
        otp: string,
        user: string,
        country:string="Nigeria"

    ): Promise<any | Error> {

        try {

            const otpUser = await this.otp.findOne({
                user,
                value: otp

            });
            if (otpUser) {
                //check user
                const userService = new UserService();
                const foundUser = await userService.getUserByPhoneOrEmail(user) as User;

                let response: any = {};
                let token: string = "";

                if (foundUser) {
                    token = createToken(foundUser);
                    response = { token, newUser: false, user: foundUser }

                } else {
                    const createdUser = await userService.create(user,country) as User;
                    token = createToken(createdUser);
                    response = { token, newUser: true, user: createdUser }

                }
                return response;


            }
            throw new Error("Invalid Otp")
        } catch (error: any) {
            throw new Error(error.toString());
        }

    }


}

export default OtpService;