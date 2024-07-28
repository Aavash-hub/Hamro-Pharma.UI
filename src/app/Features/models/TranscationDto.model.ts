export interface TransactionDto {
  TranscationOrderId: string;
  CustomerId: string;
  Discount: number;
  TotalAmount: number;
  PurchaseDate: Date;  // Make sure this matches the backend
}
