import type { IRoomType } from "./RoomType";

export interface IRoom {
    id: number;
    room_number: string;
    room_type_id: number;
    status: number;
    price: number;
    description: string | null;
    room_type: IRoomType | any ;
    room_type_name?: string;
    canBook?: boolean;
    typeName?: string;
    created_at: string;
    updated_at: string;
}