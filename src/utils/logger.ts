import { createLogger, format, transports } from "winston";
// import AWS from "aws-sdk";
// import WinstonCloudWatch  from "winston-cloudwatch";
// const {
//   CLOUDWATCH_GROUP_NAME,
//   AWS_REGION,
//   AWS_ACCESS_KEY_ID,
//   AWS_SECRET_ACCESS_KEY,
//   NODE_ENV,
// } = require("./config_env");

// AWS.config.update({ region: AWS_REGION });

const logger = createLogger({
    transports: [new transports.File({
        dirname: "logs",
        filename: "code.log",
      }),],
    format: format.combine(
      format.colorize(),
      format.timestamp(),
      format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level}: ${message}`;
      })
    ),
  });


export default logger





