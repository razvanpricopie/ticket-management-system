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
  private ROLE_CLAIM =
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
  private basePath = environment.API_ENDPOINT;

  private userRole = new BehaviorSubject<UserRoles>(UserRoles.None);
  private userLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {
    this.loadUserData();
  }

  getUserRole() {
    return this.userRole;
  }

  isUserLoggedIn() {
    return this.userLoggedIn;
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
          const token = response.token;
          localStorage.setItem('jwt', token);
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
    const token = localStorage.getItem('jwt');

    if (!token) {
      this.userRole.next(UserRoles.None);
      this.userLoggedIn.next(false);
      return;
    }

    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const payloadJson = JSON.parse(payloadDecoded);
    const roleString = payloadJson[this.ROLE_CLAIM];
    const role = UserRoles[roleString as keyof typeof UserRoles];

    this.userRole.next(role);
    this.userLoggedIn.next(true);
  }
}
