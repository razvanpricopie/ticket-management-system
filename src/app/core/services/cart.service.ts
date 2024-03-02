import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EventDetails, Ticket } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Ticket[] = [];
  private cartItemCount = new BehaviorSubject(0);
  private cartTotalAmount = new BehaviorSubject(0);

  constructor() {
    this.loadCart();
  }

  getCart() {
    return this.cartItems;
  }

  getCartTotalAmount() {
    return this.cartTotalAmount;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  increaseQuantityToCart(event: EventDetails, quantity: number) {
    const item = this.cartItems.find(
      (item) => item.event.eventId === event.eventId
    );

    if (item) {
      item.quantity += quantity;
    } else {
      this.cartItems.push({
        event: event,
        quantity: quantity,
        price: event.price,
      });
    }

    this.cartItemCount.next(this.cartItemCount.value + quantity);

    this.updateCartTotalAmount();
    this.saveCart();
  }

  decreaseQuantityToCart(event: EventDetails, quantity: number) {
    const item = this.cartItems.find(
      (item) => item.event.eventId === event.eventId
    );

    if (item) {
      if (item.quantity - quantity < 0) return;

      item.quantity -= quantity;
      this.cartItemCount.next(this.cartItemCount.value - quantity);

      if (item.quantity === 0) {
        let itemIndex = this.cartItems.indexOf(item);
        this.cartItems.splice(itemIndex, 1);
      }
    }

    this.updateCartTotalAmount();
    this.saveCart();
  }

  removeTicketFromCart(event: EventDetails) {
    const item = this.cartItems.find(
      (item) => item.event.eventId === event.eventId
    );

    if (item) {
      let itemIndex = this.cartItems.indexOf(item);
      this.cartItems.splice(itemIndex, 1);
      this.cartItemCount.next(this.cartItemCount.value - item.quantity);
    }

    this.updateCartTotalAmount();
    this.saveCart();
  }

  private updateCartTotalAmount() {
    const totalAmount = this.cartItems.reduce(
      (sum, item) => sum + item.event.price * item.quantity,
      0
    );

    this.cartTotalAmount.next(totalAmount)
  }

  private saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  private loadCart() {
    if (localStorage.getItem('cartItems')) {
      this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

      let totalCartItemCount = this.cartItems.reduce(
        (count, item) => count + item.quantity,
        0
      );
      this.cartItemCount.next(totalCartItemCount);
    }
  }
}
