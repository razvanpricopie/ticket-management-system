import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../../account/account.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserRoles } from '../../account/account.model';

@Component({
  selector: 'profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  menuButtons: MenuButtons[];

  isUserLoggedIn: boolean;
  isUserAdmin: boolean;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private dialog: MatDialogRef<ProfileMenuComponent>
  ) {}

  ngOnInit(): void {
    this.initUserAuthStatus();
    this.initMenuButtons();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
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
    this.subscriptions.push(
      this.accountService.userAuthStatus$.subscribe((isUserLoggedIn) => {
        this.isUserLoggedIn = isUserLoggedIn;
      })
    );

    this.subscriptions.push(
      this.accountService.userRole$.subscribe((userRole) => {
        this.isUserAdmin = userRole === UserRoles.Admin ? true : false;
      })
    );
  }

  private initMenuButtons() {
    this.menuButtons = [{ label: 'Profile', url: '/profile' }];

    if (this.isUserAdmin) {
      this.menuButtons.push({
        label: 'Dashboard',
        url: '/admin-dashboard',
      });
    } else {
      this.menuButtons.push({ label: 'Orders', url: '/orders' });
    }
  }
}

interface MenuButtons {
  label: string;
  url: string;
}
