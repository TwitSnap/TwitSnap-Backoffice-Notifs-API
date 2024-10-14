import {Controller} from "./Controller";
import {EventNotificationService} from "../../service/application/EventNotificationService";
import {HttpResponseSender} from "../HttpResponseSender";
import {NextFunction, Request, Response} from "express";
import {BadRequestError} from "../errors/BadRequestError";
import {Notificator} from "../../service/domain/notification/Notificator";
import {injectable} from "tsyringe";
import {NotificatorService} from "../../service/application/NotificatorService";

@injectable()
export class EventNotificationController extends Controller {
    private eventNotificationService: EventNotificationService;

    constructor(eventNotificationService: EventNotificationService, httpResponseSender: HttpResponseSender){
        super(httpResponseSender);
        this.eventNotificationService = eventNotificationService;
    }

    public notifyEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const eventType = this.getEventTypeOrBadRequestError(req);
            const params = this.getParamsOrBadRequestError(req);
            const destinations = this.getDestinationsOrBadRequestError(req);
            const sender = this.getSenderOrBadRequestError(req);
            const notificator = this.getNotificatorOrError(req);

            this.eventNotificationService.createAndNotifyEventNotification(eventType, destinations, sender, notificator, params);

            return this.okNoContentResponse(res);
        } catch (e: any) {
            this.throwError(e, EventNotificationController, next);
        }
    }

    private getEventTypeOrBadRequestError = (req: Request): string => {
        return this.getFieldOrBadRequestError(req, 'type') as string;
    }

    private getParamsOrBadRequestError = (req: Request): {[key: string]: string} => {
        return this.getFieldOrBadRequestError(req, 'params') as {[key: string]: any};
    }

    private getNotificatorOrError = (req: Request): Notificator => {
        const notification = this.getNotificationOrBadRequestError(req);
        const notificator = this.getFieldFromObjectLiteralOrBadRequestError(notification, 'type') as string;
        return this.getNotificatorInstance(notificator);
    }

    private getDestinationsOrBadRequestError = (req: Request): string[] => {
        const notification = this.getNotificationOrBadRequestError(req);
        return this.getFieldFromObjectLiteralOrBadRequestError(notification, 'destinations') as string[];
    }

    private getSenderOrBadRequestError = (req: Request): string => {
        const notification = this.getNotificationOrBadRequestError(req);
        return this.getFieldFromObjectLiteralOrBadRequestError(notification, 'sender') as string;
    }

    private getNotificationOrBadRequestError = (req: Request): {[key: string]: any} => {
        return this.getFieldOrBadRequestError(req, 'notifications');
    }

    private getNotificatorInstance = (type: string): Notificator => {
        return NotificatorService.getNotificatorFromString(type);
    }

    private getFieldFromObjectLiteralOrBadRequestError = (obj: {[key: string]: any}, field: string): any => {
        if(!obj[field]) throw new BadRequestError(`${field} is required`);
        return obj[field];
    }
}