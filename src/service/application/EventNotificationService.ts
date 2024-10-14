import {EventNotification} from "../domain/event/EventNotification";
import {Notificator} from "../domain/notification/Notificator";
import {RegistrationEventNotification} from "../domain/event/RegistrationEventNotification";
import {InvalidArgumentsError} from "../domain/errors/InvalidArgumentsError";
import {UnknownTypeError} from "./errors/UnknownTypeError";
import {logger} from "../../utils/container";
import {ResetPasswordNotification} from "../domain/event/ResetPasswordNotification";

export class EventNotificationService {
    public createAndNotifyEventNotification = (eventNotificationType: string, destinations: string[], sender: string, notificator: Notificator, eventParams: {[key: string]: string }): void => {
        logger.logInfoFromEntity(`Trying to create and notify event notification of type ${eventNotificationType}`, this.constructor);
        const eventNotification = this.createEventNotification(eventNotificationType, destinations, sender, notificator, eventParams);
        this.notifyEvent(eventNotification);
    }

    private createEventNotification = (eventNotificationType: string, destinations: string[], sender: string, notificator: Notificator, eventParams: {[key: string]: string }): EventNotification => {
        switch (eventNotificationType) {
            case 'registration':
                return this.createRegistrationEventNotification(destinations, sender, notificator, eventParams);
            case 'reset-password':
                return this.createResetPasswordNotification(destinations, sender, notificator, eventParams);
            default:
                return this.throwError(`Unknown event type: ${eventNotificationType}`, new UnknownTypeError(`Unknown event type: ${eventNotificationType}`));
        }
    }

    private createRegistrationEventNotification = (destinations: string[], sender: string, notificator: Notificator, eventParams: {[key: string]: string }): RegistrationEventNotification => {
        const username = this.getParamOrError(eventParams, 'username');
        const pin = this.getParamOrError(eventParams, 'pin');

        return new RegistrationEventNotification(notificator, destinations, sender, pin, username);
    }

    private createResetPasswordNotification = (destinations: string[], sender: string, notificator: Notificator, eventParams: {[key: string]: string }): ResetPasswordNotification => {
        const token = this.getParamOrError(eventParams, 'token');
        return new ResetPasswordNotification(notificator, destinations, sender, token);
    }

    private getParamOrError = (eventParams: {[key: string]: string}, paramName: string): string => {
        const param = eventParams[paramName];
        if (!param) this.throwError(`Missing required argument: ${paramName} is required.`, new InvalidArgumentsError(`Missing required argument: ${paramName} is required.`));

        return param;
    }

    private notifyEvent = (eventNotification: EventNotification): void => {
        eventNotification.notify();
    }

    private throwError = (logMessage: string, error: Error): never => {
        logger.logErrorFromEntity(error.constructor.name, logMessage, this.constructor);
        throw error;
    }
}