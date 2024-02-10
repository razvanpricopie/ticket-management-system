import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventDetails, CartItem } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemCount = new BehaviorSubject(0);

  getCart() {
    return this.cartItems;
  }

  getCartTotalAmount() {
    return this.cartItems.reduce(
      (sum, item) => sum + item.event.price * item.quantity,
      0
    );
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  addToCart(event: EventDetails, quantity: number) {
    const item = this.cartItems.find(
      (item) => item.event.eventId === event.eventId
    );

    if (item) {
      item.quantity += quantity;
    } else {
      this.cartItems.push({ event, quantity });
    }

    this.cartItemCount.next(this.cartItemCount.value + quantity);
  }

  removeFromCart(event: EventDetails, quantity: number) {
    const item = this.cartItems.find(
      (item) => item.event.eventId === event.eventId
    );

    if (item) {
      if (item.quantity - quantity < 0) return;

      item.quantity -= quantity;
      this.cartItemCount.next(this.cartItemCount.value - quantity);
    }
  }
}
