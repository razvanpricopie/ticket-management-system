import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'admin-events',
        pathMatch: 'full',
      },
      {
        path: 'admin-events',
        canActivate: ['adminGuard'],
        component: AdminEventsComponent,
      },
      {
        path: 'admin-categories',
        canActivate: ['adminGuard'],
        component: AdminCategoriesComponent,
      },
      {
        path: 'admin-orders',
        canActivate: ['adminGuard'],
        component: AdminOrdersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule {}
