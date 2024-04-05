import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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
  userAuthStatus$: Observable<boolean>;

  private ROLE_CLAIM =
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
  private basePath = environment.API_ENDPOINT;

  private userRoleSubject = new BehaviorSubject<UserRoles>(UserRoles.None);
  private userAuthStatusSubject = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {
    this.loadUserData();
    this.userAuthStatus$ = this.userAuthStatusSubject.asObservable();
    this.checkTokenExpiry();
  }

  getUserAuthStatus() {
    return this.userAuthStatusSubject.value;
  }

  setUserAuthStatus(userAuthStatus: boolean) {
    this.userAuthStatusSubject.next(userAuthStatus);
  }

  getUserRole() {
    return this.userRoleSubject;
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
        })
      );
  }

  logout() {
    if (!localStorage.getItem('jwt')) return;

    localStorage.removeItem('jwt');
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

  private checkTokenExpiry() {
    setInterval(() => {
      const jwt = localStorage.getItem('jwt');

      if (jwt) {
        const payloadJson = this.decodeJwtPayload(jwt);
        const expiry = new Date(payloadJson.exp * 1000);

        if (expiry && expiry < new Date()) {
          localStorage.removeItem('jwt');

          this.setUserAuthStatus(false);
        }
      }
    }, 600000);
  }

  private decodeJwtPayload(jwt: any) {
    const payload = jwt.split('.')[1];
    const payloadDecoded = atob(payload);
    const jwtPayload = JSON.parse(payloadDecoded);

    return jwtPayload;
  }
}
