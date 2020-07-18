import { CreditCard } from './credit-card';
import { Route } from './route';

export class User {
    _id?: string;
    identification?: string;
    type?: string;
    route?: Route;
    name?: string;
    lastname?: string;
    email?: string;
    birthday?: Date;
    balance?: number;
    password?: string;
    credit_card?: CreditCard;
}