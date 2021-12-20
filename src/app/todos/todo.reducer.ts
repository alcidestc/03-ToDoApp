import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { crear, editar, eliminar, limpiarCompletados, toggle, toggleAll } from './todo.actions';

export const initialState: Todo[] = [
    new Todo("Holis"),
    new Todo("Holis 2"),
    new Todo("Holis 3"),
];
 
const _todoReducer = createReducer(
  initialState,
  on(crear, (state, {texto}) => [...state, new Todo( texto)]),
  on(toggle, (state, {id}) =>{
      return state.map( todo=> {
        if (todo.id === id) {

          return {
            ...todo,
            completado: !todo.completado
          }

        }else{
          return todo;
        }
      } )
  }),
  on(editar, (state, { id, texto }) => {
    return state.map(todo => {
      if (todo.id === id) {

        return {
          ...todo,
          texto: texto
        }

      } else {
        return todo;
      }
    })
  }),
  on(eliminar, (state, { id }) => {
    return state.filter(todo => todo.id !== id);
  }),
  on(toggleAll, (state, {completado}) => {
    return state.map(todo => {

        return {
          ...todo,
          completado: completado
        }
        
    })
  }),
  on(limpiarCompletados, (state) => {
    return state.filter(todo => !todo.completado);
  }),
);
 
export function todoReducer(state: Todo [] = initialState, action: Action) {
  return _todoReducer(state, action);
}