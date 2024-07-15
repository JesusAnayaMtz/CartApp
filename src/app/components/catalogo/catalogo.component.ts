import { Component, Input } from '@angular/core';
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
}
