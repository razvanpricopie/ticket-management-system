import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CartService } from '../services/cart.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CartPanelComponent } from './cart-panel/cart-panel.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit {
  cartItemCount: number;
  displayBadge: boolean = false;
  isUserLoggedIn: boolean;

  constructor(
    private cartService: CartService,
    private dialog: MatDialog,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.initCartItemCount();

    this.initUserAuthStatus();
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

  private initCartItemCount() {
    this.cartService.getCartItemCount().subscribe((count) => {
      this.cartItemCount = count;
      this.displayBadge = this.cartItemCount > 0;
    });
  }
  
  private initUserAuthStatus() {
    this.accountService.userAuthStatus$.subscribe((isUserLoggedIn) => {
      this.isUserLoggedIn = isUserLoggedIn;
    });
  }
}
