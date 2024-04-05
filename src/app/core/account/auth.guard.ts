import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from './account.service';
import { first, map, take } from 'rxjs';

export function authGuardFactory(
  accountService: AccountService,
  router: Router
): CanActivateFn {
  return (route, state) => {
    return accountService.userAuthStatus$.pipe(
      map((isUserLoggedIn) => {
        return isUserLoggedIn;
      })
    );
  };
}
