import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CatalogoComponent } from "../catalogo/catalogo.component";
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-cart-app',
  standalone: true,
  imports: [CatalogoComponent, CartComponent],
  templateUrl: './cart-app.component.html',
  styleUrl: './cart-app.component.css'
})
export class CartAppComponent implements OnInit{

  //creamos una variable la cual sera un arreglo de productos
  productos: Product[] = [];

  //creamos una variable para manjear el estado de los elementos del carro de compras
  items : CartItem[] = [];

  //inyectamos el service
  private productservice = inject(ProductService)

  
  ngOnInit(): void { 
    //le pasamos a la varable productos todos con el service y el metodod findall
    this.productos = this.productservice.findAll();
  }

  


}
