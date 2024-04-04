import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {
  OrderDetails,
  OrderDetailsPreview,
} from 'src/app/core/models/order.model';
import { OrderService } from 'src/app/core/services/order.service';
import { OrderDetailsDialogComponent } from './order-details-dialog/order-details-dialog.component';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  dataSource: OrderDetailsPreview[] = [];

  displayedColumns: string[] = [
    'index',
    'orderId',
    'ticketsNumber',
    'orderTotal',
    'createdDate',
  ];

  loading: boolean = true;

  constructor(private orderService: OrderService, private dialog: MatDialog) {}

  ngOnInit() {
    this.initOrdersTable();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  initOrdersTable() {
    this.sub = this.orderService.getAllOrders().subscribe((orders) => {
      this.dataSource = [...orders];
      this.loading = false;
    });
  }

  openOrderDetails(orderId: string) {
    this.orderService.getOrderDetails(orderId).subscribe((orderDetails) => {
      this.dialog.open(OrderDetailsDialogComponent, {
        data: orderDetails,
        width: '800px',
      });
    });
  }
}
