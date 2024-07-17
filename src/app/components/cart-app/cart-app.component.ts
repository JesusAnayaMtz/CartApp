import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CatalogoComponent } from "../catalogo/catalogo.component";
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cartItem';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { CartModalComponent } from '../cart-modal/cart-modal.component';

@Component({
  selector: 'app-cart-app',
  standalone: true,
  imports: [CatalogoComponent, CartModalComponent, NavbarComponent],
  templateUrl: './cart-app.component.html',
  styleUrl: './cart-app.component.css'
})
export class CartAppComponent implements OnInit{

  //creamos una variable la cual sera un arreglo de productos
  productos: Product[] = [];
  
  nProducts: number = 0;

  //creamos una variable para manjear el estado de los elementos del carro de compras
  items : CartItem[] = [];

  total: number = 0;

  //bandera para poder mostrar y oculatar el carro de compras
  showCart: boolean = false;


  //inyectamos el service
  private productservice = inject(ProductService)

  
  ngOnInit(): void { 
    //le pasamos a la varable productos todos con el service y el metodod findall
    this.productos = this.productservice.findAll();
    //aqui recuperamos los datos del sessionstorage si existen los obtiene si no se coloca un arreglo vacio
    this.items = JSON.parse(sessionStorage.getItem('cart')!) || [];
    this.calculaTotal();
  }

  //en este metodo actualizamos los productos el cual sera un arreglo exparcimos los eleemento y agregamos el nuevo objeto como una nueva instancia colando el original y exparcimos y cantidad
  onAddCart(product: Product){
    //recorremos los items busvcando alguno que sea igual a uno existente
    const hasItem = this.items.find(item => {
      return item.product.id === product.id;
    })
    //si econtramos uno entra al if y si es true va actualizar
    if(hasItem){
      //con el siguiente if validamos que si el id es igual a la cantidad le agregue 1 mas
      this.items = this.items.map(item => {
        if(item.product.id === product.id){
          return { 
            //expacimos el iten y se agrega a quatity 1
            ... item,
            quantity: item.quantity + 1
          }
        }
        return item;
      })
    }else {
      //si no encontra uno igual se va a else y agrega el producto diferente al carro
      this.items = [... this.items, {product: {... product}, quantity: 1}];
    } 
    this.calculaTotal();
    this.saveSession();
  }

  onDeleteProductCart(id: number): void{
    //validamos con filter regresamos todos los items que son diferentes del id y crea un nuevo arreglo con los elemento que sean diferentes al id
    this.items = this.items.filter(item => item.product.id !== id);
    this.calculaTotal();
    this.saveSession();
  }

  //metodo que calcula el total
  calculaTotal(): void {
    //hacemos el calculo con reduce el cual la primer varable almacenara el total acumulado y la segunda variable es el item que inicializara en 0
    this.total = this.items.reduce((acumuladorTotal, item) => acumuladorTotal + item.quantity * item.product.price, 0);
    this.nProducts = this.items.reduce((totalItems, item) => totalItems + item.quantity, 0);
  }

  saveSession():void {
  //con JSON.stringfy convertimos nuestro objeto a string y con sessionsatorage, setitem pasamos nuestro objeto para que se guarde localmente
  sessionStorage.setItem('cart', JSON.stringify(this.items));
}

//metodo para devolver a true showcart
openCart(): void{
  this.showCart = !this.showCart;
}


  


}
