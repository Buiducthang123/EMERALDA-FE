export enum EBookingStatus {
   NOT_CHECKED_IN = 2,
   CHECKED_IN = 3,
   CHECKED_OUT = 4,
   CANCELLED = 5,
}

export const EBookingStatusText: Record<EBookingStatus, string> = {
    [EBookingStatus.NOT_CHECKED_IN]: 'Chưa nhận phòng',
    [EBookingStatus.CHECKED_IN]: 'Đã nhận phòng',
    [EBookingStatus.CHECKED_OUT]: 'Đã trả phòng',
    [EBookingStatus.CANCELLED]: 'Đã hủy',
};