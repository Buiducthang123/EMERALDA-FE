import type { IRoom } from "./Rooms";

export interface ICancelRequest {
    id: number;
    order_id: number;
    room_id: number;
    user_id: number;
    refund_amount: number;
    status: string;
    created_at: string;
    updated_at: string;
    room?: IRoom;
  }

  export interface IBankAccountInfo {
    bankAccountNumber: string;
    recipientName: string;
    bankName: string;
    confirmation: boolean;
  }