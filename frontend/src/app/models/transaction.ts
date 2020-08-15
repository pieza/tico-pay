import { Route } from './route';
import { User } from './user';

export class Transaction {
    _id?: string;

    /**
     * Null if type is recharge
     */
    route?: Route;

    /**
     * Client
     */
    user?: User;

    /**
     * 'charge' or 'recharge', use the enum.
     */
    type?: TransactionTypes;

    /**
     * Amount
     */
    amount?: number;

    /**
     * Date
     */
    date?: Date;
}

export enum TransactionTypes {
    /**
     * Cuando se le cobra al cliente.
     */
    CHARGE   = 'charge',

    /**
     * Cuando se hace una recarga.
     */
    RECHARGE = 'recharge',

    /**
     * Cuando no se permite subir a alguien al autobus
     */
    DENIED   = 'denied'
}