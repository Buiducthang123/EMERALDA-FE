import type { IRoom } from "./Rooms";

export interface IRoomType {
    id: number;
    name: string;
    slug:string;
    intro_description:string,
    main_image: string | null;
    thumbnails: string[] | null;
    max_people: number;
    area: number;
    rooms?:IRoom[]; 
    price: number;
    description?: string ;
    amenities: any[] | null;
    roomTypeReviews: any[] | null;
    total_rooms: number;
    created_at: string;
    updated_at: string;
}