// ECancelRequestStatus.ts
export enum ECancelRequestStatus {
  PENDING = 1, // Chờ
  WAITING_COMPLETE = 2, // Chờ hoàn thành
  REJECTED = 3, // Từ chối
  CANCELLED = 4, // Đã hủy
  COMPLETED = 5, // Đã hoàn thành
}

export const getStatusText = (status: ECancelRequestStatus) => {
  switch (status) {
    case ECancelRequestStatus.PENDING:
      return { text: 'Chờ duyệt', color: 'blue' };
    case ECancelRequestStatus.WAITING_COMPLETE:
      return { text: 'Đã duyệt/ chờ xử lý', color: 'orange' };
    case ECancelRequestStatus.REJECTED:
      return { text: 'Từ chối', color: 'red' };
    case ECancelRequestStatus.CANCELLED:
      return { text: 'Đã hủy', color: 'gray' };
    case ECancelRequestStatus.COMPLETED:
      return { text: 'Đã hoàn thành', color: 'green' };
    default:
      return { text: 'Không xác định', color: 'default' };
  }
};