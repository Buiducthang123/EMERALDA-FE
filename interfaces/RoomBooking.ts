import type { IOrder } from "./Order";
import type { IRoom } from "./Rooms";

export interface IRoomBooking {
    id: number;
    order_id: string|number;
    room_id: string|number;
    check_in_date: string;
    check_out_date: string;
    status: string | number;
    order: IOrder;
    room: IRoom;
}
