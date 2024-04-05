import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { AuthenticationRequest } from '../account.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  authenticationForm: FormGroup;

  errorMessageList: string;
  isUserLoggedIn: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initUserAuthStatus();
    
    this.authenticationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  authenticate() {
    if (!this.authenticationForm.valid || this.isUserLoggedIn) return;

    let authUser: AuthenticationRequest = {
      email: this.authenticationForm.get('email')?.value,
      password: this.authenticationForm.get('password')?.value,
    };

    this.accountService.authenticate(authUser).subscribe({
      next: (result) => {
        window.location.reload();
      },
      error: (error) => {
        this.errorMessageList = error.error.error.split('\n');
      },
    });
  }

  private initUserAuthStatus() {
    this.accountService.userAuthStatus$.subscribe((isUserLoggedIn) => {
      this.isUserLoggedIn = isUserLoggedIn;
    });
  }
}
