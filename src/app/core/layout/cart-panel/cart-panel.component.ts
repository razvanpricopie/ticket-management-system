import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/event.model';

@Component({
  selector: 'cart-panel',
  templateUrl: './cart-panel.component.html',
  styleUrls: ['./cart-panel.component.scss']
})
export class CartPanelComponent implements OnInit {
  cartItems: CartItem[]
  totalCartAmount: number;

  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
    this.totalCartAmount = this.cartService.getCartTotalAmount();
  }

}
