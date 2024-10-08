import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { OrderCompletedComponent } from './shared/components/order-completed/order-completed.component';
import { AuthenticationComponent } from './core/account/authentication/authentication.component';
import { RegistrationComponent } from './core/account/registration/registration.component';
import { ErrorComponent } from './core/error/error.component';

const routes: Routes = [
  { path: 'error', component: ErrorComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'authentication',
        canActivate: ['notAuthGuard'],
        component: AuthenticationComponent,
      },
      {
        path: 'registration',
        canActivate: ['notAuthGuard'],
        component: RegistrationComponent,
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: 'events',
        loadChildren: () =>
          import('./events/events.module').then((m) => m.EventsModule),
      },
      {
        path: 'profile',
        canActivate: ['authGuard'],
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'orders',
        canActivate: ['authGuard'],
        loadChildren: () =>
          import('./orders/orders.module').then((m) => m.OrdersModule),
      },
      {
        path: 'admin-dashboard',
        canActivate: ['adminGuard'],
        loadChildren: () =>
          import('./admin-dashboard/admin-dashboard.module').then(
            (m) => m.AdminDashboardModule
          ),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./cart/cart.module').then((m) => m.CartModule),
      },
      {
        path: 'order-complete',
        // canActivate: ['orderCompletionGuard'],
        component: OrderCompletedComponent,
      },
      {
        path: 'favourite-events',
        canActivate: ['authGuard'],
        loadChildren: () =>
          import('./favourite-events/favourite-events.module').then(
            (m) => m.FavouriteEventsModule
          ),
      },
      { path: '**', redirectTo: '/home' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
