import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Vendor } from '../../models/vendor.model';

import { ActivatedRoute, Router } from '@angular/router';
import { VendorService } from '../service/vendor.service';

@Component({
  selector: 'app-edit-vendor',
  templateUrl: './edit-vendor.component.html',
  styleUrls: ['./edit-vendor.component.css']
})
export class EditVendorComponent implements OnInit {

  @Input() vendor: Vendor = {
    id: '',
    name: '',
    address: '',
    number: '',
    companyName: '',
    balance: 0
  };
  @Output() success = new EventEmitter<void>();
  @Output() error = new EventEmitter<void>();
  showSuccessDialog = false;
  showErrorDialog = false;

  constructor(
    private vendorService: VendorService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const vendorId = this.route.snapshot.paramMap.get('id');
    if (vendorId) {
      this.vendorService.getVendorById(vendorId).subscribe({
        next: (vendor) => {
          this.vendor = vendor;
        },
        error: (error) => {
          console.error('Failed to retrieve vendor:', error);
        }
      });
    }
  }

  saveVendor(): void {
    this.vendorService.editVendor(this.vendor.id, this.vendor).subscribe({
      next: () => {
        this.success.emit();
      },
      error: (error) => {
        console.error('Failed to update vendor:', error);
        this.error.emit();
      }
    });
  }

  closeSuccessDialog(): void {
    this.showSuccessDialog = false;
    this.router.navigateByUrl('/vendors').then(() => {
      window.location.reload();
    });
  }

  closeErrorDialog(): void {
    this.showErrorDialog = false;
  }
}
