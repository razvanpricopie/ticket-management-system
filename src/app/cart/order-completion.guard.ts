import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OrderService } from '../core/services/order.service';
import { map, take } from 'rxjs';

export const orderCompletionGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const orderService: OrderService = inject(OrderService);

  return orderService.isOrderComplete().pipe(
    take(1),
    map((isOrderComplete) => (isOrderComplete ? true : router.parseUrl('/')))
  );
};
