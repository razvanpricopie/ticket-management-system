import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../../account/account.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent implements OnInit, OnDestroy {
  sub: Subscription;

  menuButtons: MenuButtons[];

  isUserLoggedIn: boolean;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private dialog: MatDialogRef<ProfileMenuComponent>
  ) {}

  ngOnInit(): void {
    this.initUserAuthStatus();

    this.menuButtons = [
      { label: 'Profile', url: '/profile' },
      { label: 'Orders', url: '/orders' },
    ];
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/']);
    window.location.reload();
  }

  redirectToLoginPage() {
    this.router.navigate(['/authentication']);
    this.dialog.close();
  }

  redirectToRegisterPage() {
    this.router.navigate(['/registration']);
    this.dialog.close();
  }

  private initUserAuthStatus() {
    this.sub = this.accountService.userAuthStatus$.subscribe(
      (isUserLoggedIn) => {
        this.isUserLoggedIn = isUserLoggedIn;
      }
    );
  }
}

interface MenuButtons {
  label: string;
  url: string;
}
