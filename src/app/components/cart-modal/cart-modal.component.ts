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
  

  @Output() idProductEventEmmiterModal = new EventEmitter();

  onDeleteProductCart(){
    this.idProductEventEmmiterModal.emit();
  }

  @Output() openEventEmmiter = new EventEmitter();

  openCart() {
    this.openEventEmmiter.emit();
  }


  @Output() comprarEventEmmiter = new EventEmitter();

  comprar(){
    this.comprarEventEmmiter.emit();
  }

}
