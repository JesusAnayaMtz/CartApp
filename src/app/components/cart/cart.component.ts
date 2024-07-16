import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  
  //creamos un arreglo de tipo cartiem el cual contiene catidad y producto
  @Input() items: CartItem[] = [];
  @Input() total = 0;

  @Output() idProductEventEmmiter = new EventEmitter();

  onDeleteProductCart(id: number){
    this.idProductEventEmmiter.emit(id);
  }

}
