export interface IVoucher {
    id: number;
    name: string; // tên voucher
    main_image?: string; // ảnh đại diện, có thể để trống
    description?: string; // mô tả, có thể để trống
    quantity: number; // số lượng voucher
    code: string; // mã voucher
    discount_amount: number; // số tiền giảm giá
    valid_from: string; // ngày bắt đầu hiệu lực
    valid_until: string; // ngày hết hạn
    applicable_room_types?: string[]; // danh sách loại phòng áp dụng, có thể để trống
    created_at: string; // ngày tạo
    updated_at: string; // ngày cập nhật
}