import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductoCardComponent } from '../producto-card/producto-card.component';
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProductoCardComponent],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {

  //@Input() productos : Product[] = [];

  productos : Product[] = [];

  //este mismo se le va a pasar al padre que es el cartapp
  //@Output() productEventEmmiter: EventEmitter<Product> = new EventEmitter();

  //productEventEmmiter: EventEmitter<Product> = new EventEmitter();

  constructor(private sharingDataService: SharingDataService,private router: Router){
    this.productos = this.router.getCurrentNavigation()?.extras.state!['products']
  }

//le pasamos el evento que viene del hijo (productcartcomponent)
  onAddCart(product: Product){
    this.sharingDataService.productEventEmmiter.emit(product);
  }
}
