import { Component, OnInit } from '@angular/core';
import { VendorService } from '../service/vendor.service';
import { Vendor } from '../../models/vendor.model';
import { AuthService } from '../../auth/Services/auth.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
  vendorList: Vendor[] = [];
  filteredVendorList: Vendor[] = [];
  showAddVendorForm = false;
  showEditVendorForm = false;
  showPayVendorBalanceForm = false;
  showSuccessDialog = false;
  showErrorDialog = false;
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 1;
  searchQuery = '';
  selectedVendor: Vendor = {
    id: '',
    name: '',
    address: '',
    number: '',
    companyName: '',
    balance: 0
  };

  constructor(private vendorService: VendorService,public authservice: AuthService) { }

  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors(): void {
    this.vendorService.getAllVendors().subscribe({
      next: (vendors) => {
        this.vendorList = vendors;
        this.filteredVendorList = vendors;
        this.totalPages = Math.ceil(this.filteredVendorList.length / this.itemsPerPage);
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
          this.vendorList = this.vendorList.filter(vendor => vendor.id !== id);
          this.filteredVendorList = this.filteredVendorList.filter(vendor => vendor.id !== id);
          this.totalPages = Math.ceil(this.filteredVendorList.length / this.itemsPerPage);
        },
        error: (error) => {
          console.error('Failed to delete vendor:', error);
        }
      });
    }
  }

  toggleAddVendorForm(): void {
    this.showAddVendorForm = !this.showAddVendorForm;
  }

  closeEditVendorForm(): void {
    this.showEditVendorForm = false;
  }

  closePayVendorBalanceForm(): void {
    this.showPayVendorBalanceForm = false;
  }

  editVendor(vendor: Vendor): void {
    this.selectedVendor = { ...vendor };  // Create a copy to avoid direct binding issues
    this.showEditVendorForm = true;
  }

  payVendorBalance(vendor: Vendor): void {
    this.selectedVendor = { ...vendor };  // Create a copy to avoid direct binding issues
    this.showPayVendorBalanceForm = true;
  }

  onAddVendorSuccess(): void {
    this.showAddVendorForm = false;
    this.showSuccessDialog = true;
    this.loadVendors(); // Reload vendors after successful addition
  }

  onAddVendorError(): void {
    this.showErrorDialog = true;
  }

  onEditVendorSuccess(): void {
    this.showEditVendorForm = false;
    this.showSuccessDialog = true;
    this.loadVendors(); // Reload vendors after successful edit
  }

  onEditVendorError(): void {
    this.showErrorDialog = true;
  }

  onPayVendorBalanceSuccess(): void {
    this.showPayVendorBalanceForm = false;
    this.showSuccessDialog = true;
    this.loadVendors(); // Reload vendors after successful payment
  }

  onPayVendorBalanceError(): void {
    this.showErrorDialog = true;
  }

  closeSuccessDialog(): void {
    this.showSuccessDialog = false;
  }

  closeErrorDialog(): void {
    this.showErrorDialog = false;
  }

  searchVendors(): void {
    this.filteredVendorList = this.vendorList.filter(vendor => 
      vendor.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      vendor.address.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      vendor.companyName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.totalPages = Math.ceil(this.filteredVendorList.length / this.itemsPerPage);
    this.currentPage = 1;
  }

  get paginatedVendors(): Vendor[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredVendorList.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}