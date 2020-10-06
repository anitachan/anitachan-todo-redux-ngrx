import { createReducer, on } from '@ngrx/store';
import * as actions from './todo.actions';
import { Todo }from './models/todo.models';

export const estadoInicial: Todo[] = [
  new Todo('Salvar el mundo'),
  new Todo('Vencer a Thanos'),
  new Todo('Comprar traje IronMan'),
  new Todo('Robar escudo capitan América'),
];
 
const _todoReducer = createReducer(
    estadoInicial,
  on(actions.crear, (state, { texto }) => [...state, new Todo(texto)]),
  on(actions.borrar, (state, { id }) => state.filter( todo => todo.id !== id)),
  on(actions.limpiarTodos, (state) => state.filter(todo => !todo.completado)),
  on(actions.toogle, (state, { id }) => {
    return state.map( todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado
        }
      }
      else{
        return todo;
      }
    });
  }),
  on(actions.editar, (state, { id, texto }) => {
    return state.map( todo => {
      if (todo.id === id) {
        return {
          ...todo,
          texto: texto
        }
      }
      else{
        return todo;
      }
    });
  }),

  on(actions.toogleAll, (state, { completado }) => {
    return state.map( todo => {
      return {
        ...todo,
        completado: completado
      }
    });
  }),

);
 
export function todoReducer(state, action) {
  return _todoReducer(state, action);
}