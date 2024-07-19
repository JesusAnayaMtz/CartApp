import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cartItem';
import { RouterModule } from '@angular/router';
import { CartAppComponent } from "../cart-app/cart-app.component";

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [CartComponent, RouterModule, CartAppComponent],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.css'
})
export class CartModalComponent {

  @Input() items: CartItem[] = [];
  @Input() totaln: number = 0;

  @Input() cartActiveN: number = 1;
  

  @Output() idProductEventEmmiterModal = new EventEmitter();

  onDeleteProductCartModal(id: number){
    this.idProductEventEmmiterModal.emit(id);
  }

  @Output() openEventEmmiter = new EventEmitter();

  openCart() {
    this.openEventEmmiter.emit();
  }

  @Output() cartActiveEventEmmiter = new EventEmitter();

  comprar(cartActive: number){
    this.cartActiveEventEmmiter.emit();
  }

  

}
