import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _idProductEventEmmiter: EventEmitter<number> = new EventEmitter();

  constructor() { }

  private _productEventEmmiter: EventEmitter<Product> = new EventEmitter();


  get productEventEmmiter(): EventEmitter<Product> {
    return this._productEventEmmiter;
  }

  get idProductEventEmmiter(): EventEmitter<number> {
    return this._idProductEventEmmiter;
  }

}
