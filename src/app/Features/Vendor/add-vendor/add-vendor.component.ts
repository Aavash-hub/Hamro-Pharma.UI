import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from '../service/vendor.service';
import { Vendor } from '../../models/vendor.model';
import { AddVendorRequest } from '../../models/Add-vendor-request.model';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css']
})
export class AddVendorComponent {
  formData: AddVendorRequest = {
    name: '',
    address: '',
    number: '',
    companyName: '',
    balance: 0,
  };

  showSuccessDialog = false;
  showErrorDialog = false;

  constructor(private vendorService: VendorService, private router: Router) { }

  onFormSubmit(): void {
    this.vendorService.addVendor(this.formData).subscribe({
      next: (response) => {
        this.showSuccessDialog = true;
      },
      error: (error) => {
        this.showErrorDialog = true;
      }
    });
  }

  closeSuccessDialog() {
    this.showSuccessDialog = false;
    this.router.navigateByUrl('vendor/vendor-list').then(() => {
      window.location.reload();
    });
  }

  closeErrorDialog() {
    this.showErrorDialog = false;
    this.router.navigateByUrl('vendor/vendor-list').then(() => {
      window.location.reload();
    });
  }
}
