import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {
  BehaviorSubject,
  Observable,
  Subject,
  filter,
  interval,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import {
  AuthenticationRequest,
  AuthenticationResponse,
  RegistrationUser,
  UserRoles,
} from './account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  userRole$: Observable<UserRoles>;
  userAuthStatus$: Observable<boolean>;

  private ROLE_CLAIM =
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
  private basePath = environment.API_ENDPOINT;

  private userRoleSubject = new BehaviorSubject<UserRoles>(UserRoles.None);
  private userAuthStatusSubject = new BehaviorSubject<boolean>(false);
  private startCheckTokenExpirySubject = new Subject<void>();

  constructor(private httpClient: HttpClient) {
    this.loadUserData();
    this.userRole$ = this.userRoleSubject.asObservable();
    this.userAuthStatus$ = this.userAuthStatusSubject.asObservable();

    this.triggerCheckingTokenInterval();
  }

  setUserAuthStatus(userAuthStatus: boolean) {
    this.userAuthStatusSubject.next(userAuthStatus);
  }

  setUserRole(jwt: any) {
    const payloadJson = this.decodeJwtPayload(jwt);
    const roleString = payloadJson[this.ROLE_CLAIM];
    const role = UserRoles[roleString as keyof typeof UserRoles];

    this.userRoleSubject.next(role);
  }

  authenticate(
    authenticationUser: AuthenticationRequest
  ): Observable<AuthenticationResponse> {
    return this.httpClient
      .post<AuthenticationResponse>(
        `${this.basePath}/api/account/authenticate`,
        authenticationUser
      )
      .pipe(
        tap((response) => {
          const jwt = response.token;
          localStorage.setItem('jwt', jwt);
          this.startCheckTokenExpirySubject.next();
        })
      );
  }

  logout() {
    if (!localStorage.getItem('jwt')) return;

    localStorage.removeItem('jwt');
    this.startCheckTokenExpirySubject.next();
  }

  register(registrationUser: RegistrationUser) {
    return this.httpClient.post<string>(
      `${this.basePath}/api/account/register`,
      registrationUser
    );
  }

  private loadUserData() {
    const jwt = localStorage.getItem('jwt');

    if (!jwt) {
      this.userRoleSubject.next(UserRoles.None);
      this.userAuthStatusSubject.next(false);
      return;
    }

    this.setUserRole(jwt);
    this.setUserAuthStatus(true);
  }

  private triggerCheckingTokenInterval() {
    this.userAuthStatus$
      .pipe(
        filter((isAuthenticated) => isAuthenticated),
        switchMap(() =>
          interval(1800000).pipe(
            startWith(0),
            takeUntil(this.startCheckTokenExpirySubject)
          )
        )
      )
      .subscribe(() => this.checkTokenExpiry());
  }

  private checkTokenExpiry() {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      const payloadJson = this.decodeJwtPayload(jwt);
      const expiry = new Date(payloadJson.exp * 1000);

      if (expiry && expiry < new Date()) {
        localStorage.removeItem('jwt');

        this.setUserAuthStatus(false);
        this.startCheckTokenExpirySubject.next();
      }
    }
  }

  private decodeJwtPayload(jwt: any) {
    const payload = jwt.split('.')[1];
    const payloadDecoded = atob(payload);
    const jwtPayload = JSON.parse(payloadDecoded);

    return jwtPayload;
  }
}
