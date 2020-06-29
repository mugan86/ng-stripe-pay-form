export interface IStripePaymentCard {
    number?: string;
    expMonth: number;
    expYear: number;
    cvc?: string;
    valid: boolean;
    type: string;
    securityCode: {
        name: string;
        size: number;
    };
}
