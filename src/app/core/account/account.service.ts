import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
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
  UpdatePassword,
  UpdateUser,
  UserDetails,
  UserRoles,
} from './account.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  userRole$: Observable<UserRoles>;
  userAuthStatus$: Observable<boolean>;
  userDetails$: Observable<UserDetails>;

  private ROLE_CLAIM =
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
  private basePath = environment.API_ENDPOINT;

  private userRoleSubject = new BehaviorSubject<UserRoles>(UserRoles.None);
  private userAuthStatusSubject = new BehaviorSubject<boolean>(false);
  private startCheckTokenExpirySubject = new Subject<void>();
  private userDetailsSubject = new ReplaySubject<UserDetails>(1);

  private jwt: string;

  constructor(private httpClient: HttpClient) {
    this.loadUserData();
    this.userRole$ = this.userRoleSubject.asObservable();
    this.userAuthStatus$ = this.userAuthStatusSubject.asObservable();
    this.userDetails$ = this.userDetailsSubject.asObservable();

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
        tap((response: AuthenticationResponse) => {
          localStorage.setItem('userData', JSON.stringify(response));
          this.startCheckTokenExpirySubject.next();
        })
      );
  }

  logout() {
    if (!localStorage.getItem('userData')) return;

    localStorage.removeItem('userData');
    this.startCheckTokenExpirySubject.next();
  }

  register(registrationUser: RegistrationUser): Observable<string> {
    return this.httpClient.post<string>(
      `${this.basePath}/api/account/register`,
      registrationUser
    );
  }

  updateUser(updateUser: UpdateUser): Observable<string> {
    return this.httpClient.put<string>(
      `${this.basePath}/api/account/updateUser/${updateUser.userId}`,
      updateUser
    );
  }

  updatePassword(updatePassword: UpdatePassword): Observable<string> {
    return this.httpClient.put<string>(
      `${this.basePath}/api/account/updatePassword/${updatePassword.userId}`,
      updatePassword
    );
  }

  private loadUserData() {
    if (localStorage.getItem('userData')) {
      let authRespose: AuthenticationResponse = JSON.parse(
        localStorage.getItem('userData') || ''
      );

      if (authRespose.token) {
        this.jwt = authRespose.token;
        this.setUserRole(authRespose.token);
        this.setUserAuthStatus(true);
      } else {
        this.userRoleSubject.next(UserRoles.None);
        this.userAuthStatusSubject.next(false);
      }

      let userDetails: UserDetails = {
        userId: authRespose.userId,
        email: authRespose.email,
        firstName: authRespose.firstName,
        lastName: authRespose.lastName,
      };

      this.userDetailsSubject.next(userDetails);
    }
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
    if (this.jwt) {
      const payloadJson = this.decodeJwtPayload(this.jwt);
      const expiry = new Date(payloadJson.exp * 1000);

      if (expiry && expiry < new Date()) {
        localStorage.removeItem('userData');

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
