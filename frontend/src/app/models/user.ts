import { CreditCard } from './credit-card';

export class User {
    _id?: string;
    identification?: string;
    type?: string;
    name?: string;
    lastname?: string;
    email?: string;
    birthday?: Date;
    password?: string;
    credit_card?: CreditCard;
}