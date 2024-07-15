import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { CatalogoComponent } from '../catalogo/catalogo.component';

@Component({
  selector: 'app-producto-card',
  standalone: true,
  imports: [CatalogoComponent],
  templateUrl: './producto-card.component.html',
  styleUrl: './producto-card.component.css'
})
export class ProductoCardComponent {

@Input() product!: Product;

}
