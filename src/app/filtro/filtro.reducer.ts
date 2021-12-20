import { Action, createReducer, on } from '@ngrx/store';
import { filtrar, filtrosValidos } from './filtro.actions';

export const initialState: filtrosValidos = 'todos';
 
const _filtroReducer = createReducer<filtrosValidos, Action>(
  initialState,
  on(filtrar, (state, {filtro}) => filtro)
 
);
 
export function filtroReducer(state: filtrosValidos = initialState, action: Action) {
  return _filtroReducer(state, action);
}