import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CartTicketItemComponent } from './cart-ticket-item/cart-ticket-item.component';


@NgModule({
  declarations: [
    CartComponent,
    CartTicketItemComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CartModule { }
