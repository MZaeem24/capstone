// interfaces/voucher.ts
export interface IVoucher {
    _id: string;
    restaurantId: string;
    discountPercentage: number;
    timeRange: string;
    available: number; // Number of vouchers available
    // Add other fields as necessary
  }
  