import { Component, EventEmitter, Inject, inject, OnInit, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CatalogoComponent } from "../catalogo/catalogo.component";
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cartItem';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { CartModalComponent } from '../cart-modal/cart-modal.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { itemsState } from '../../store/items.reducer';
import { add, remove, total } from '../../store/items.actions';


@Component({
  selector: 'app-cart-app',
  standalone: true,
  imports: [CatalogoComponent, CartModalComponent, NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
  styleUrl: './cart-app.component.css'
})
export class CartAppComponent implements OnInit{

  //creamos una variable la cual sera un arreglo de productos
 // productos: Product[] = [];
  
  nProducts: number = 0;

  //creamos una variable para manjear el estado de los elementos del carro de compras
  items : CartItem[] = [];

  total: number = 0;

  //bandera para poder mostrar y oculatar el carro de compras
  showCart: boolean = false;
 

  //inyectamos el service
  private productservice = inject(ProductService)

  constructor( private sharingDataService: SharingDataService){
    this.store.select('items').subscribe(state => {
      //datos para componentes iniciales en el sharingdataservice los cuales los obtenemos del store
      this.items = state.items;
      this.total = state.total;
      this.nProducts = state.nProducts;
      this.saveSession();
    })
  }

  private router = inject(Router)

  private store = inject(Store<{items: itemsState}>)



  
  ngOnInit(): void { 
    //le pasamos a la varable productos todos con el service y el metodod findall
   // this.productos = this.productservice.findAll();
    //aqui recuperamos los datos del sessionstorage si existen los obtiene si no se coloca un arreglo vacio
    //this.items = JSON.parse(sessionStorage.getItem('cart')!) || [];
    //this.calculaTotal();

    this.onDeleteProductCart();
    this.onAddCart();
  }

  //en este metodo actualizamos los productos el cual sera un arreglo exparcimos los eleemento y agregamos el nuevo objeto como una nueva instancia colando el original y exparcimos y cantidad
  onAddCart(): void{
    this.sharingDataService.productEventEmmiter.subscribe(product => {
      //recorremos los items busvcando alguno que sea igual a uno existente

      //se agrega el reducer que viene del action
    this.store.dispatch(add({product: product}))
    this.store.dispatch(total())
   // this.calculaTotal();
    //this.saveSession();
    Swal.fire({
      title: "Agregado",
      text: "Producto Agregado Al Carro",
      icon: "success",
    });
    })
  }

  onDeleteProductCart(): void{
    this.sharingDataService.idProductEventEmmiter.subscribe(id => {
      //validamos con filter regresamos todos los items que son diferentes del id y crea un nuevo arreglo con los elemento que sean diferentes al id
      Swal.fire({
        title: "Esta Seguro Que Desea Eliminar?",
        text: "Cuidado esto es irreversible",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {

          
   // this.calculaTotal();
   this.store.dispatch(remove({id}));
   this.store.dispatch(total())
    //this.saveSession();
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>{
      this.router.navigate(['/cart'], {
        state: {items: this.items, totaln: this.total}
      })
    })
          Swal.fire({
            title: "Eliminado!",
            text: "El producto ah sido eliminado",
            icon: "success"
          });
        }
      });
    })  
  }

 /* onDeleteProductCartModal(id: number): void{
      //validamos con filter regresamos todos los items que son diferentes del id y crea un nuevo arreglo con los elemento que sean diferentes al id
    this.items = this.items.filter(item => item.product.id !== id);
    this.calculaTotal();
    this.saveSession();
  } */

  //metodo que calcula el total
  /* calculaTotal(): void {
    //hacemos el calculo con reduce el cual la primer varable almacenara el total acumulado y la segunda variable es el item que inicializara en 0
    this.total = this.items.reduce((acumuladorTotal, item) => acumuladorTotal + item.quantity * item.product.price, 0);
    this.nProducts = this.items.reduce((totalItems, item) => totalItems + item.quantity, 0);
  }
 */
  saveSession():void {
  //con JSON.stringfy convertimos nuestro objeto a string y con sessionsatorage, setitem pasamos nuestro objeto para que se guarde localmente
  sessionStorage.setItem('cart', JSON.stringify(this.items));
}

//metodo para devolver a true showcart
openCart(): void{
  this.showCart = !this.showCart;
}
  


}
