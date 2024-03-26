import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  errorMessageList: string;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
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

  register() {
    if (
      !this.registrationForm.valid ||
      this.accountService.isUserLoggedIn().value
    )
      return;

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
