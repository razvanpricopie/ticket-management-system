import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderDetails } from 'src/app/core/models/order.model';

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.scss']
})
export class OrderDetailsDialogComponent implements OnInit {
  orderDetailsData: OrderDetails;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: OrderDetails,
    private dialog: MatDialogRef<OrderDetailsDialogComponent>
  ) {}

  ngOnInit(): void {
    this.data.id && (this.orderDetailsData = JSON.parse(JSON.stringify(this.data)));
  }

  close() {
    this.dialog.close();
  }
}
