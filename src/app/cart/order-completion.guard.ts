import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OrderService } from '../core/services/order.service';
import { map, take } from 'rxjs';

export function orderCompletionGuardFactory(
  orderService: OrderService,
  router: Router
): CanActivateFn {
  return (route, state) => {
    return orderService.orderComplete$.pipe(
      take(1),
      map((isOrderComplete) => (isOrderComplete ? true : router.parseUrl('/')))
    );
  };
}