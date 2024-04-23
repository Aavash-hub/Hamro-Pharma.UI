export interface OrderDetail {
    orderProductsId: string;  // Assuming this should be a string of GUID
    orderId: string;
    quantity: number;
    productName: string;
    price: number;
}
