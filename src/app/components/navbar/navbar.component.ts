import { Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  @Input() items: CartItem[] = [];

  @Input() numProducts: number = 0;

  @Input() products: Product[] = [];

  @Output() openEventEmmiter = new EventEmitter();

  openCart(): void {
    this.openEventEmmiter.emit();
  }

  @Input() total: number = 0;

}
