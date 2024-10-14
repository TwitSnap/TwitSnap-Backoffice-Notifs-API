import {Response, Request, NextFunction} from "express";
import {HttpResponseSender} from "../HttpResponseSender";
import {BadRequestError} from "../errors/BadRequestError";
import {logger} from "../../utils/container";

/**
 * Abstract base class for controllers that handle HTTP responses.
 *
 * This class provides methods for sending standard HTTP responses with different status codes.
 * It uses an instance of `HttpResponseSender` to format and send responses.
 */
export abstract class Controller {
    private _responseSender: HttpResponseSender;

    protected constructor(responseSender: HttpResponseSender){
        this._responseSender = responseSender;
    }

    /**
     * Sends the response with status code 204 and no response body.
     * @param res - The Response object to send.
     */
    protected okNoContentResponse = (res: Response): void => {
        this._responseSender.okNoContentResponse(res);
    }

    protected getFieldOrBadRequestError = (req: Request, field: string): any => {
        if(!req.body[field]) throw new BadRequestError(`${field} is required`);
        return req.body[field];
    }

    protected throwError = (error: any, entity: Function, next: NextFunction): void => {
        logger.logErrorFromEntity(error.constructor.name, error.message, entity);
        next(error);
    }
}