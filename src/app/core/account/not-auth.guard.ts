import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from './account.service';
import { map } from 'rxjs';

export function notAuthGuardFactory(
  accountService: AccountService,
  router: Router
): CanActivateFn {
  return (route, state) => {
    return accountService.userAuthStatus$.pipe(
      map((isUserLoggedIn) => {
        if(isUserLoggedIn)
          router.navigate(['/']);
        
        return !isUserLoggedIn;
      })
    );
  };
}
