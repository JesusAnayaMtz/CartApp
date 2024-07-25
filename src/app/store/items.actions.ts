import { createAction, props } from "@ngrx/store";
import { Product } from "../models/product";

//creamos nuestras acciones que se usaran en los componentes
export const add = createAction('add', props<{product : Product}>());
export const remove = createAction('remove', props<{id: number}>());
export const total = createAction('total');
