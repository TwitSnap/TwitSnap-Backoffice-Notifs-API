import { Notificator } from "./Notificator";
import nodemailer from 'nodemailer';
import { logger } from "../../../utils/container";
import { NotificationError } from "../errors/NotificationError";

export class EmailNotificator extends Notificator {
    private transporter: nodemailer.Transporter;

    constructor(service: string, user: string, password: string) {
        super();
        this.transporter = nodemailer.createTransport({ service: service, auth: { user: user, pass: password }});

        this.transporter.verify((error, _) => {
            if (error) this.throwError(`Error while verifying email transporter: ${error}`, new NotificationError("Error while verifying email transporter."), this.constructor);
        });
    }

    notify = (sender: string, destinations: string[], subject: string, payload: string): void => {
        return this.sendEmail(sender, destinations, subject, payload);
    }

    sendEmail = (sender: string, destinations: string[], subject: string, payload: string): void => {
        logger.logInfoFromEntity(`Sending email notification:
            From: ${sender}
            To: ${destinations}
            Subject: ${subject}
            Payload: ${payload}`, this.constructor);

        const mailOptions = {
            from: sender,
            to: destinations,
            subject: subject,
            html: payload,
            attachments: [
                {
                    filename: 'twitsnapLogo.png',
                    path: 'resources/twitsnapLogo.png',
                    cid: 'TwitSnap-Logo'
                }
            ]
        };

        try {
            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) this.throwError(`Error while sending email notification: ${error}`, new NotificationError("Error while sending email notification."), this.constructor);

                const successInfo = `Email notification sent: 
                    SMTP Response: ${info.response}
                    Message ID: ${info.messageId}
                    Envelope (from -> to): ${info.envelope.from} -> ${info.envelope.to}`;

                logger.logInfoFromEntity(successInfo, this.constructor);
            });
        } catch (e) {
            this.throwError(`Error while sending email notification: ${e}`, new NotificationError("Error while sending email notification."), this.constructor);
        }
    }
}
