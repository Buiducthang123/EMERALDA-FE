import type { IPayment } from "./Payment";

export interface IOrder {
    id: number;
    user_id: string|number; 
    customer_info: ICustomer;
    payable_amount: number;
    prepayment_amount: number;
    refunded_status: boolean;
    room_ids: string[] | number[];
    total_price: number;
    voucher_code?: string;
    payment?:IPayment
}

export interface ICustomer {
    name: string;
    email: string;
    phone_number: string;
    address: string;
    birthday: string;
}