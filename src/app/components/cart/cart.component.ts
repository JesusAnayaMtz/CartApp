import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { CartModalComponent } from "../cart-modal/cart-modal.component";
import { SharingDataService } from '../../services/sharing-data.service';
import { CartAppComponent } from '../cart-app/cart-app.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent  {

  constructor(private sharingDataService: SharingDataService, private router: Router){
    this.items = this.router.getCurrentNavigation()?.extras.state!['items'];
    this.total = this.router.getCurrentNavigation()?.extras.state!['totaln'];
  }

   @Input() cartActiveN: number = 1;

  //creamos un arreglo de tipo cartiem el cual contiene catidad y producto
  @Input() items: CartItem[] = [];
  @Input() total = 0;

  @Output() idProductEventEmmiter = new EventEmitter();

  onDeleteProductCart(id: number){
    this.sharingDataService.idProductEventEmmiter.emit(id);
  }

  @Output() idProductEventEmmiterModal = new EventEmitter();

  onDeleteProductCartModal(id: number): void{
    this.idProductEventEmmiterModal.emit(id);
  }



}
