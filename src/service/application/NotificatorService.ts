import {Notificator} from "../domain/notification/Notificator";
import {EmailNotificator} from "../domain/notification/EmailNotificator";
import {EMAIL_PASSWORD, EMAIL_SERVICE, EMAIL_USER} from "../../utils/config";
import {UnknownTypeError} from "./errors/UnknownTypeError";

export class NotificatorService {
    public static getNotificatorFromString = (type: string): Notificator => {
        switch (type) {
            case "email":
                return new EmailNotificator(EMAIL_SERVICE, EMAIL_USER, EMAIL_PASSWORD);
            default:
                throw new UnknownTypeError("Unknown notificator type.");
        }
    }
}