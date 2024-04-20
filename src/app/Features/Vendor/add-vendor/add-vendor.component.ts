import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from '../service/vendor.service';
import { Vendor } from '../../models/vendor.model';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css']
})
export class AddVendorComponent {

  formData: Vendor = {
    name: '',
    address: '',
    number: '',
    companyName: '',
    balance: 0,
    id: ''
  };

  constructor(private vendorService: VendorService, private router: Router) { }

  onFormSubmit(): void {
    this.vendorService.addVendor(this.formData).subscribe({
      next: (response) => {
        console.log('Vendor added successfully:', response);
        // Redirect to the vendor list page after successful addition
        this.router.navigate(['vendor/vendor-list']);
      },
      error: (error) => {
        console.error('Failed to add vendor:', error);
      }
    });
  }
}
