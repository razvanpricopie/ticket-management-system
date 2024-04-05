import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from './account.service';
import { UserRoles } from './account.model';
import { map } from 'rxjs';

export function adminGuardFactory(
  accountService: AccountService,
  router: Router
): CanActivateFn {
  return (route, state) => {
    return accountService.userRole$.pipe(
      map((userRole) => {
        if(userRole !== UserRoles.Admin){
          router.navigate(['/']);
          return false;
        }

        return true;
      })
    );
  };
}
