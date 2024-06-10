import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EventDetails, Ticket } from '../models/event.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItemCount$: Observable<number>;
  cartTotalAmount$: Observable<number>;

  private cartItems: Ticket[] = [];
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  private cartTotalAmountSubject = new BehaviorSubject<number>(0);

  constructor() {
    this.loadCart();
    this.cartItemCount$ = this.cartItemCountSubject.asObservable();
    this.cartTotalAmount$ = this.cartTotalAmountSubject.asObservable();
  }

  getCart() {
    return this.cartItems;
  }

  setCartItemCount(quantity: number) {
    this.cartItemCountSubject.next(quantity);
  }

  setCartTotalAmount(totalAmount: number) {
    this.cartTotalAmountSubject.next(totalAmount);
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

    this.setCartItemCount(this.cartItemCountSubject.value + quantity);

    this.updateCartTotalAmount();
    this.saveCartToLocalStorage();
  }

  decreaseQuantityToCart(event: EventDetails, quantity: number) {
    const item = this.cartItems.find(
      (item) => item.event.eventId === event.eventId
    );

    if (item) {
      if (item.quantity - quantity < 0) return;

      item.quantity -= quantity;
      this.setCartItemCount(this.cartItemCountSubject.value - quantity);

      if (item.quantity === 0) {
        let itemIndex = this.cartItems.indexOf(item);
        this.cartItems.splice(itemIndex, 1);
      }
    }

    this.updateCartTotalAmount();
    this.saveCartToLocalStorage();
  }

  removeTicketFromCart(event: EventDetails) {
    const item = this.cartItems.find(
      (item) => item.event.eventId === event.eventId
    );

    if (item) {
      let itemIndex = this.cartItems.indexOf(item);
      this.cartItems.splice(itemIndex, 1);

      this.setCartItemCount(this.cartItemCountSubject.value - item.quantity);
    }

    this.updateCartTotalAmount();
    this.saveCartToLocalStorage();
  }

  refreshCart() {
    this.cartItems = [];

    this.setCartItemCount(0);
    this.setCartTotalAmount(0);

    this.deleteCartFromLocalStorage();
  }

  private updateCartTotalAmount() {
    const totalAmount = this.cartItems.reduce(
      (sum, item) => sum + item.event.price * item.quantity,
      0
    );

    this.setCartTotalAmount(totalAmount);
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  private deleteCartFromLocalStorage() {
    localStorage.removeItem('cartItems');
  }

  private loadCart() {
    if (localStorage.getItem('cartItems')) {
      this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

      let totalCartItemCount = this.cartItems.reduce(
        (count, item) => count + item.quantity,
        0
      );

      this.setCartItemCount(totalCartItemCount);

      let totalAmount = this.cartItems.reduce(
        (count, item) => count + item.quantity * item.price,
        0
      );

      this.setCartTotalAmount(totalAmount);
    }
  }
}
