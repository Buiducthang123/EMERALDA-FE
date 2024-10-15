
export interface IPayment {
    id: number;
    order_id: string | number;
    user_id: string | number;
    amount: number;
    status: string | number;
    transaction_id?: string;
    payment_date: string;

}