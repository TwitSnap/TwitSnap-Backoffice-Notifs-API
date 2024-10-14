import { Notificator } from '../notification/Notificator';

export abstract class EventNotification {
    private notificator: Notificator;
    private readonly destinations: string[];
    private readonly sender: string;

    protected constructor(notificator: Notificator, destinations: string[], sender: string) {
        this.notificator = notificator;
        this.destinations = destinations;
        this.sender = sender;
    }

    protected abstract getPayload: () => string;

    public notify = (): void => {
        this.notificator.notify(this.sender, this.destinations, this.getSubject(), this.getPayload());
    }

    protected abstract getSubject: () => string;
}
