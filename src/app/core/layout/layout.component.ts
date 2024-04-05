import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CartService } from '../services/cart.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CartPanelComponent } from './cart-panel/cart-panel.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { AccountService } from '../account/account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];

  cartItemCount: number;
  displayBadge: boolean = false;
  isUserLoggedIn: boolean;

  constructor(
    private cartService: CartService,
    private dialog: MatDialog,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  openCartPanelAsDialog(event: MouseEvent) {
    const target = event.target as Element;
    const rect = target.getBoundingClientRect();
    const dialogWidth = 300;

    let cartPanelDialogRef = this.dialog.open(CartPanelComponent, {
      width: `${dialogWidth}px`,
      position: {
        top: `${rect.bottom}px`,
        left: `${rect.left - (dialogWidth - rect.width)}px`,
      },
      hasBackdrop: true,
      backdropClass: 'transparent-backdrop',
    });
  }

  openProfileMenuAsDialog(event: MouseEvent) {
    const target = event.target as Element;
    const rect = target.getBoundingClientRect();
    let dialogWidth = 150;

    if (this.isUserLoggedIn) {
      dialogWidth = 150;
    } else {
      dialogWidth = 300;
    }

    let profileMenuDialogRef = this.dialog.open(ProfileMenuComponent, {
      width: `${dialogWidth}px`,
      position: {
        top: `${rect.bottom}px`,
        left: `${rect.left - (dialogWidth - rect.width)}px`,
      },
      hasBackdrop: true,
      backdropClass: 'transparent-backdrop',
    });
  }

  private initSubscriptions() {
    this.subscriptions.push(
      this.cartService.cartItemCount$.subscribe((cartItemCount) => {
        this.cartItemCount = cartItemCount;
        this.displayBadge = this.cartItemCount > 0;
      })
    );

    this.subscriptions.push(
      this.accountService.userAuthStatus$.subscribe((isUserLoggedIn) => {
        this.isUserLoggedIn = isUserLoggedIn;
      })
    );
  }
}
