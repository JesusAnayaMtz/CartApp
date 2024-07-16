import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductoCardComponent } from '../producto-card/producto-card.component';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProductoCardComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {

  @Input() productos : Product[] = [];


  //este mismo se le va a pasar al padre que es el cartapp
  @Output() productEventEmmiter: EventEmitter<Product> = new EventEmitter();

//le pasamos el evento que viene del hijo (productcartcomponent)
  onAddCart(product: Product){
    this.productEventEmmiter.emit(product);
  }
}
