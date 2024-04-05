import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AccountService } from './account.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      let isAuthenticated: boolean = false;

      this.accountService.userAuthStatus$.subscribe((authStatus) => {
        isAuthenticated = authStatus;
      });

      if (!isAuthenticated) return next.handle(request);

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt}`,
        },
      });
    }
    return next.handle(request);
  }
}
