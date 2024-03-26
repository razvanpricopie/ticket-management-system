import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from './account.service';
import { authGuardFactory } from './auth.guard';

export function notAuthGuardFactory(
  accountService: AccountService,
  router: Router
): CanActivateFn {
  const authGuard = authGuardFactory(accountService, router);

  return (route, state) => {
    if(authGuard(route, state)) {
      router.navigate(['/']);
      return false;
    }

    return true;
  };
}
