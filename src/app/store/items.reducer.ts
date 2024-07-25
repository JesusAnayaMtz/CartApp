import { createReducer, on } from "@ngrx/store";
import { CartItem } from "../models/cartItem";
import { add, remove, total } from "./items.actions";


export interface itemsState {
    //los items serian del tipo cartitem y un arrglo
    items: CartItem[],
    total: number,
    nProducts: number
}


//colocamos nuestro estado inicial del reducer
export const initialState: itemsState = {
    //este seria el estado inicia de los items que seria un arreglo vacio o en su caso se obtiene los productos de la sesion
    items: JSON.parse(sessionStorage.getItem('cart')!) || [],
    total: 0,
    nProducts: 0
}

export const itemsReducer = createReducer(
    initialState,
    on(add, (state, {product}) =>{
        const hasItem = state.items.find((item: CartItem) => {
            return item.product.id === product.id;
          })
          //si econtramos uno entra al if y si es true va actualizar
          if(hasItem){
            //con el siguiente if validamos que si el id es igual a la cantidad le agregue 1 mas 
            return{ items: state.items.map(item => {
              if(item.product.id === product.id){
                return {
                  //expacimos el iten y se agrega a quatity 1
                  ... item,
                  quantity: item.quantity + 1
                }
              }
              return item;
            }),
            total: state.total,
            nProducts: state.nProducts
        }
          }else {
            //si no encontra uno igual se va a else y agrega el producto diferente al carro
            return {items: [... state.items, {product: {... product}, quantity: 1}],
            total: state.total,
            nProducts: state.nProducts
          };
        }
    }),

    on(remove, (state, {id}) => {
        return {
            items: state.items.filter(item => item.product.id !== id),
            total : state.total,
            nProducts : state.nProducts
        }
    }),

    on(total, state =>{
        return {
            items: state.items,
            total: state.items.reduce((totalItems, item) => totalItems + item.quantity * item.product.price, 0),
            nProducts: state.items.reduce((totalItems, item) => totalItems + item.quantity, 0)
        }
    })
)