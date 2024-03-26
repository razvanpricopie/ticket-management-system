import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from './account.service';

export function authGuardFactory(
  accountService: AccountService,
  router: Router
): CanActivateFn {
  return (route, state) => {
    const isUserLoggedIn = accountService.isUserLoggedIn();

    return !!isUserLoggedIn.value;
  };
}
