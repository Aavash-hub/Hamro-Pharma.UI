export interface Purchase {
    id: string;
    quantity: number;
    price: number;
    purchaseDate: Date;
    totalAmount: number;
    vendorId: string;
    productId: string;
  }
  