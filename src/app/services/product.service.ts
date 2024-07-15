import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { products } from '../data/product.data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  //metodo que devuleve un arrego de todos los produtos
  findAll(): Product[] {
    //retornamos nuestra lista de productos provicional
    return products;
  }
}
