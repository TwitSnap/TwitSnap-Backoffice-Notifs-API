import dotenv from 'dotenv';
import { Helpers } from "./helpers";

dotenv.config();

const requiredEnvVars = [
    "PORT",
    "LOG_ROUTE", "LOGGING", "LOG_ERROR", "LOG_DEBUG", "LOG_INFO",
    "EMAIL_SERVICE", "EMAIL_USER", "EMAIL_PASSWORD",
    "RESET_PASSWORD_URL",
];

Helpers.validateEnvVarsList(requiredEnvVars);

// ? Server config
export const PORT = process.env.PORT;

// ? Logger config
export const LOG_ROUTE = process.env.LOG_ROUTE;
export const LOGGING = process.env.LOGGING;
export const LOG_ERROR = process.env.LOG_ERROR;
export const LOG_DEBUG = process.env.LOG_DEBUG;
export const LOG_INFO = process.env.LOG_INFO;

// ? Email service config
export const EMAIL_SERVICE = process.env.EMAIL_SERVICE as string;
export const EMAIL_USER = process.env.EMAIL_USER as string;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD as string;

// ? Reset password URL
export const RESET_PASSWORD_URL = process.env.RESET_PASSWORD_URL as string;