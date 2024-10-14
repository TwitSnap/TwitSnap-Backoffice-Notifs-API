import { EventNotification } from "./EventNotification";
import { Notificator } from "../notification/Notificator";

export class RegistrationInviteEventNotification extends EventNotification {
    private readonly token: string;

    constructor(notificator: Notificator, destinations: string[], sender: string, token: string) {
        super(notificator, destinations, sender);
        this.token = token;
    }

    protected getSubject = (): string => {
        return "TwitSnap Backoffice - Join us! 👨‍💼";
    }

    // ? Todos los payloads a enviarse por mail deben ser en HTML y tener un logo de TwitSnap al final.
    protected getPayload = (): string => {
        return `
            <div style="padding: 20px; font-family: Arial, sans-serif; color: #333;">
                <p>Hi there,<br><br></p>
                <p>You have been invited to join TwitSnap Team as an admin!<br> 
                To perform your registration, please use the following token:<br><br>
                <strong style="font-size: 1.2em; color: #007BFF;">${this.token}</strong><br><br></p>
                Cheers,<br>
                The TwitSnap Team 😊</p>
                <div style="text-align:left; margin-top:10px;">
                    <img src="cid:TwitSnap-Logo" style="width:auto; height:auto; max-width:100px; max-height:100px; border-radius:15px;" alt="TwitSnap Logo"/>
                </div>
            </div>
        `;
    }
}
