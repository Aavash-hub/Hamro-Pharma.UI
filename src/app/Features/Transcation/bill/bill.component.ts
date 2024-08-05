import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Bill } from '../../models/Bill.model';
import { TranscationService } from '../service/transcation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent {
  @Input() transactionId: string = '';
  @Output() closeBillEvent = new EventEmitter<void>();  // This is the @Input decorator

  bill: Bill | undefined;

  constructor(private transactionService: TranscationService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactionId'] && this.transactionId) {
      this.transactionService.generateBill(this.transactionId)
        .subscribe(bill => {
          this.bill = bill;
        }, error => {
          console.error('Error loading bill', error);
        });
    }
  }
  closeBill() {
    this.closeBillEvent.emit();  // Emitting event to notify parent component
  }
}
