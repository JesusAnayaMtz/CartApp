import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [CartComponent],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.css'
})
export class CartModalComponent {

  @Input() items: CartItem[] = [];
  @Input() total = 0;

  @Output() idProductEventEmmiter = new EventEmitter();

  onDeleteProductCart(id: number){
    this.idProductEventEmmiter.emit(id);
  }

    @Output() openEventEmmiter = new EventEmitter();

  openCart(): void {
    this.openEventEmmiter.emit();
  }

}
