export interface AuthenticationRequest {
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  id: string;
  password: string;
  token: string;
}

export interface RegistrationUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export enum UserRoles {
  Admin = 'Admin',
  User = 'User',
  None = 'None',
}
