export interface PurchaseReport {
  vendorName: string;
  productName: string;
  quantity: number;
  price: number;
  purchasedate: string; // treated as a string in 'YYYY-MM-DD' format
}
