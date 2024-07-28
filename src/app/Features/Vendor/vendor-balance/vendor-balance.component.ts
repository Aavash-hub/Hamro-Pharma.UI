import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VendorService } from '../service/vendor.service';
import { Vendor } from '../../models/vendor.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-balance',
  templateUrl: './vendor-balance.component.html',
  styleUrls: ['./vendor-balance.component.css']
})
export class VendorBalanceComponent {
  @Input() vendor: Vendor | null = null;
  @Output() success = new EventEmitter<void>();
  @Output() error = new EventEmitter<void>();
  amount: number = 0;
  showSuccessDialog = false;
  showErrorDialog = false;

  constructor(private vendorService: VendorService, private router: Router) {}

  ngOnInit(): void {}

  payVendorBalance(): void {
    if (this.vendor && this.amount > 0 && this.vendor.balance >= this.amount) {
      this.vendorService.payVendorBalance(this.vendor.id, this.amount, { responseType: 'text' }).subscribe({
        next: (response) => {
          console.log('Response:', response);
          this.success.emit();
          this.vendor!.balance -= this.amount;
        },
        error: (error) => {
          console.error('Failed to update vendor balance:', error);
          this.error.emit();
        }
      });
    } else {
      this.error.emit();
    }
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
    
