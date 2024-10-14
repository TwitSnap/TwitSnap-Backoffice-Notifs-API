import {Notificator} from "../notification/Notificator";
import {EventNotification} from "./EventNotification";
import {RESET_PASSWORD_URL} from "../../../utils/config";

export class ResetPasswordNotification extends EventNotification {
    private readonly token: string;

    constructor(notificator: Notificator, destinations: string[], sender: string, token: string) {
        super(notificator, destinations, sender);
        this.token = token;
    }

    protected getSubject = (): string => {
        return "TwitSnap Backoffice - Reset your password! 🔒";
    }

    // ? Todos los payloads a enviarse por mail deben ser en HTML y tener un logo de TwitSnap al final.
    protected getPayload = (): string => {
        return `
            <div style="padding: 20px; font-family: Arial, sans-serif; color: #333;">
                <p>Hi there Admin!<br><br></p>
                <p>We received a request to reset your password at TwitSnap.<br> 
                To reset your password, please click the following link:<br><br>
                <a href="${RESET_PASSWORD_URL}${this.token}" style="color: #007bff;">Reset password</a><br><br>
                <p>If you're having trouble clicking the "Reset password" button, copy and paste the URL below into your web browser:<br>
                <pre>${RESET_PASSWORD_URL}${this.token}</pre></p>
                <p>If you did not request a password reset, please ignore this email.<br><br> 
                Cheers,<br>
                The TwitSnap Team 😊</p>
                <div style="text-align:left; margin-top:10px;">
                    <img src="cid:TwitSnap-Logo" style="width:auto; height:auto; max-width:100px; max-height:100px; border-radius:15px;" alt="TwitSnap Logo"/>
                </div>
            </div>
        `;
    }
}