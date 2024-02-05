import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderDetails } from 'src/app/core/models/order.model';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  dataSource: OrderDetails[] = [];

  displayedColumns: string[] = ['index', 'date', 'orderPaid', 'userId']

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.initOrdersTable();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  initOrdersTable() {
    this.sub = this.orderService.getAllOrders().subscribe((orders) => {
      this.dataSource = [...orders];
    });
  }
}
