import { CreditCard } from './credit-card';

export class User {
    identification: String;
    name: String;
    lastname: String;
    email: String;
    birthday: Date;
    password: String;
    password2: String;
    credit_card: CreditCard;
}