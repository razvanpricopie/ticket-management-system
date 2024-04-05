import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { OrderDetails } from 'src/app/core/models/order.model';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.scss'],
})
export class OrderDetailsDialogComponent implements OnInit, OnDestroy {
  sub: Subscription;

  orderDetailsData: OrderDetails;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: string,
    private dialog: MatDialogRef<OrderDetailsDialogComponent>,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.sub = this.orderService
      .getOrderDetails(this.data)
      .subscribe((orderDetails) => {
        this.orderDetailsData = orderDetails;
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  close() {
    this.dialog.close();
  }
}
