import { Component, OnInit } from '@angular/core';
import { VendorService } from '../service/vendor.service';
import { Vendor } from '../../models/vendor.model';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {

  vendorList: Vendor[] = [];

  constructor(private vendorService: VendorService) { }

  ngOnInit(): void {
    this.vendorService.getAllVendors().subscribe({
      next: (vendors) => {
        this.vendorList = vendors;
      },
      error: (error) => {
        console.error('Failed to retrieve vendors:', error);
      }
    });
  }

  deleteVendor(id: string): void {
    if (confirm('Are you sure you want to delete this vendor?')) {
      this.vendorService.deleteVendor(id).subscribe({
        next: () => {
          // Remove the deleted vendor from the vendorList
          this.vendorList = this.vendorList.filter(vendor => vendor.id !== id);
        },
        error: (error) => {
          console.error('Failed to delete vendor:', error);
        }
      });
    }
  }
}
