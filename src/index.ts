import "dotenv/config";
import "module-alias/register";
import validateEnv from '@/utils/validateEnv';
import App from "./app";
import UserController from "@/resources/user/user.controller";
import OtpController from "@/resources/otp/otp.controller";

validateEnv();

const app =new App([
    new UserController(),
    new OtpController(),
],Number(process.env.PORT));

app.listen();