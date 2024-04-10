export interface AuthenticationRequest {
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}

export interface UserDetails {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface RegistrationUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UpdateUser {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UpdatePassword {
  userId: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export enum UserRoles {
  Admin = 'Admin',
  User = 'User',
  None = 'None',
}
