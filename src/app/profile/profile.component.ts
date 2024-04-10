import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AccountService } from '../core/account/account.service';
import {
  AuthenticationRequest,
  UpdatePassword,
  UpdateUser,
  UserDetails,
} from '../core/account/account.model';
import { Observable, Subscription, map } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  sub: Subscription;

  personalDetailsFormGroup: FormGroup;
  passwordFormGroup: FormGroup;

  userId: string;
  personalDetailsErrorMessageList: string;
  updatePasswordErrorMessageList: string;

  loading: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.sub = this.accountService.userDetails$.subscribe((userDetails) => {
      this.userId = userDetails.userId;
      this.initPersonalDetailsFormGroup(userDetails);
      this.loading = false;
    });

    this.initPasswordFormGroup();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  updatePersonalDetails() {
    if (!this.userId && !this.personalDetailsFormGroup.valid) return;

    this.loading = true;

    let updateUser: UpdateUser = {
      userId: this.userId,
      email: this.personalDetailsFormGroup.get('email')?.value,
      firstName: this.personalDetailsFormGroup.get('firstName')?.value,
      lastName: this.personalDetailsFormGroup.get('lastName')?.value,
    };

    this.accountService.updateUser(updateUser).subscribe({
      next: (result) => {
        this.loading = false;
        this.initPersonalDetailsFormGroup(updateUser);
      },
      error: (error) => {
        this.personalDetailsErrorMessageList = error.error.error.split('\n');
        this.loading = false;
      },
    });
  }

  updatePassword() {
    if (!this.userId && !this.passwordFormGroup.valid) return;

    this.loading = true;

    let updatePassword: UpdatePassword = {
      userId: this.userId,
      email: this.personalDetailsFormGroup.get('email')?.value,
      currentPassword: this.passwordFormGroup.get('currentPassword')?.value,
      newPassword: this.passwordFormGroup.get('newPassword')?.value,
      newPasswordConfirmation: this.passwordFormGroup.get(
        'newPasswordConfirmation'
      )?.value,
    };

    this.accountService.updatePassword(updatePassword).subscribe({
      next: (result) => {
        this.loading = false;
        window.location.reload();
      },
      error: (error) => {
        this.updatePasswordErrorMessageList = error.error.error.split('\n');
        this.loading = false;
      },
    });
  }

  private initPersonalDetailsFormGroup(userDetails: UserDetails) {
    this.personalDetailsFormGroup = this.formBuilder.group({
      firstName: [userDetails.firstName, [Validators.required]],
      lastName: [userDetails.lastName, [Validators.required]],
      email: [{ value: userDetails.email, disabled: true }],
    });
  }

  private initPasswordFormGroup() {
    this.passwordFormGroup = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          this.nonAlphanumericValidator(),
          this.numericValidator(),
          this.uppercaseValidator(),
        ],
      ],
      newPasswordConfirmation: ['', [Validators.required]],
    });
  }

  private numericValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = /\d/.test(control.value);
      return valid ? null : { numeric: { value: control.value } };
    };
  }

  private nonAlphanumericValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = /\W|_/.test(control.value);
      return valid ? null : { nonAlphanumeric: { value: control.value } };
    };
  }

  private uppercaseValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = /[A-Z]/.test(control.value);
      return valid ? null : { uppercase: { value: control.value } };
    };
  }
}
