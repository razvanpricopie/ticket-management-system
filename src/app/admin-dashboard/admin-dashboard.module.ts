import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { EventDetailsDialogComponent } from './admin-events/event-details-dialog/event-details-dialog.component';
import { EventAddUpdateDialogComponent } from './admin-events/event-add-update-dialog/event-add-update-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryDetailsDialogComponent } from './admin-categories/category-details-dialog/category-details-dialog.component';
import { CategoryAddUpdateDialogComponent } from './admin-categories/category-add-update-dialog/category-add-update-dialog.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminEventsComponent,
    AdminCategoriesComponent,
    AdminOrdersComponent,
    EventDetailsDialogComponent,
    EventAddUpdateDialogComponent,
    CategoryDetailsDialogComponent,
    CategoryAddUpdateDialogComponent,
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers:[DatePipe]
})
export class AdminDashboardModule { }
