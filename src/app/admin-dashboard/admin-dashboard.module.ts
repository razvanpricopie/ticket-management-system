import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { EventDetailsDialogComponent } from './admin-events/event-details-dialog/event-details-dialog.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminEventsComponent,
    AdminCategoriesComponent,
    AdminOrdersComponent,
    EventDetailsDialogComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    SharedModule
  ]
})
export class AdminDashboardModule { }
