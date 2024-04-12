import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { OrderTicketItemComponent } from './order-ticket-item/order-ticket-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [OrdersComponent, OrderTicketItemComponent],
  imports: [CommonModule, OrdersRoutingModule, SharedModule],
})
export class OrdersModule {}
