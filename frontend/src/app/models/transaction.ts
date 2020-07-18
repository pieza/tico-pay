import { Route } from './route';
import { User } from './user';

export class Transaction {
    _id?: string;
    route?: Route;
    user?: User;
    amount?: number;
    date?: Date;
}