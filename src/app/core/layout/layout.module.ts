import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CdkMenuModule } from '@angular/cdk/menu';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { CartPanelComponent } from './cart-panel/cart-panel.component';

@NgModule({
  declarations: [LayoutComponent, ProfileMenuComponent, CartPanelComponent],
  imports: [CommonModule, RouterModule, SharedModule, CdkMenuModule],
})
export class LayoutModule {}
