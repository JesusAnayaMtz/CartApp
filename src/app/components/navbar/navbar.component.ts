import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  @Input() items: CartItem[] = [];

  @Input() numProducts: number = 0;

  @Output() openEventEmmiter = new EventEmitter();

  openCart(): void {
    this.openEventEmmiter.emit();
  }

}
