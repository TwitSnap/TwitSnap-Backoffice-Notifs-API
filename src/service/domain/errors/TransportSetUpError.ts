export class TransportSetUpError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, TransportSetUpError.prototype);
    }
}