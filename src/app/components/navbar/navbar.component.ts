import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { CommonModule } from '@angular/common';
import { CartAppComponent } from '../cart-app/cart-app.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, CartAppComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  @Input() items: CartItem[] = [];

  @Output() openEventEmmiter = new EventEmitter();

  nProducts: number = 0;

  openCart(): void {
    this.openEventEmmiter.emit();
  }

  totalProductosCart(){
    this.nProducts = this.items.reduce((totalItems, item) => totalItems + item.quantity, 0);
  }

}
