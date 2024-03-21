import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from './account.service';
import { UserRoles } from './account.model';
import { inject } from '@angular/core';

export function adminGuardFactory(
  accountService: AccountService,
  router: Router
): CanActivateFn {
  return (route, state) => {
    const roleValue = accountService.getUserRole().value;

    if (!roleValue || roleValue !== UserRoles.Admin) {
      router.navigate(['/']);
      return false;
    }

    return true;
  };
}
