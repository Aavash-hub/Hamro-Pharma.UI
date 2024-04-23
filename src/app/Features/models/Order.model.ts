import { OrderDetail } from "./Order-details.model";

export interface Order {
  id: string;
  totalamount: number;
  orderDate: Date;
  orderDetails: OrderDetail[];
}
