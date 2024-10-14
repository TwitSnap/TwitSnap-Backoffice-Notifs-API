import { EventNotification } from "./EventNotification";
import { Notificator } from "../notification/Notificator";

export class RegistrationEventNotification extends EventNotification {
    private readonly registrationPin: string;
    private readonly username: string;

    constructor(notificator: Notificator, destinations: string[], sender: string, registrationPin: string, username: string) {
        super(notificator, destinations, sender);
        this.registrationPin = registrationPin;
        this.username = username;
    }

    protected getSubject = (): string => {
        return "TwitSnap Backoffice - Confirm your registration! 👨‍💼";
    }

    // ? Todos los payloads a enviarse por mail deben ser en HTML y tener un logo de TwitSnap al final.
    protected getPayload = (): string => {
        return `
            <div style="padding: 20px; font-family: Arial, sans-serif; color: #333;">
                <p>Hi ${this.username},<br><br></p>
                <p>Thank you for registering as an admin at TwitSnap!<br> 
                To confirm your registration, please use the following PIN:<br><br>
                <strong style="font-size: 1.2em; color: #007BFF;">${this.registrationPin}</strong><br><br></p>
                <p>If you did not register at TwitSnap Backoffice, please ignore this email.<br><br> 
                Cheers,<br>
                The TwitSnap Team 😊</p>
                <div style="text-align:left; margin-top:10px;">
                    <img src="cid:TwitSnap-Logo" style="width:auto; height:auto; max-width:100px; max-height:100px; border-radius:15px;" alt="TwitSnap Logo"/>
                </div>
            </div>
        `;
    }
}
