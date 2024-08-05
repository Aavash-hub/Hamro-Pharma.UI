// bill.model.ts
export interface BillItem {
    productName: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }
  
  export interface Bill {
    customerName: string;
    customerEmail: string;
    items: BillItem[];
    totalAmount: number;
    discount: number;
    finalAmount: number;
    transactionDate: Date;
  }
  