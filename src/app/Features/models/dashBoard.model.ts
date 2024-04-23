import { ExpiredDrugDto } from "./ExpiredDrugDto.model";

export interface DashboardDto {
    totalSales: number;
    totalPurchases: number;
    numberOfCustomers: number;
    numberOfVendors: number;
    expiredDrugs: ExpiredDrugDto[];
  }