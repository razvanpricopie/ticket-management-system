import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { AuthenticationRequest, RegistrationUser } from '../account.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  sub: Subscription;

  registrationForm: FormGroup;

  errorMessageList: string;
  isUserLoggedIn: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initUserAuthStatus();
    
    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          this.nonAlphanumericValidator(),
          this.numericValidator(),
          this.uppercaseValidator(),
        ],
      ],
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  register() {
    if (!this.registrationForm.valid || this.isUserLoggedIn) return;

    let registrationUser: RegistrationUser = {
      firstName: this.registrationForm.get('firstName')?.value,
      lastName: this.registrationForm.get('lastName')?.value,
      email: this.registrationForm.get('email')?.value,
      password: this.registrationForm.get('password')?.value,
    };

    this.accountService.register(registrationUser).subscribe({
      next: (result) => {
        let authUser: AuthenticationRequest = {
          email: registrationUser.email,
          password: registrationUser.password,
        };

        this.accountService
          .authenticate(authUser)
          .subscribe(() => window.location.reload());
      },
      error: (error) => {
        this.errorMessageList = error.error.error.split('\n');
      },
    });
  }

  private initUserAuthStatus() {
    this.sub = this.accountService.userAuthStatus$.subscribe((isUserLoggedIn) => {
      this.isUserLoggedIn = isUserLoggedIn;
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
