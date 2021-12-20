import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filtrar, filtrosValidos } from '../../filtro/filtro.actions';
import { limpiarCompletados } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.scss']
})
export class TodoFooterComponent implements OnInit {

  filtroActual: filtrosValidos = 'todos';
  filtros: filtrosValidos[] =['todos', 'completados', 'pendientes'];

  pendientes: number  = 0;

  constructor(private store: Store<AppState>) { 
    
  }

  ngOnInit(): void {
    this.store.subscribe(state=>{
      this.filtroActual = state.filtro;
      console.log(this.filtroActual);

      this.pendientes = state.todos.filter(todo=> !todo.completado).length
      
    })
  }

  cambiarFiltro(filtro: filtrosValidos){
    this.store.dispatch(filtrar({filtro: filtro}))
  }

  limpiarCompletados(){
    this.store.dispatch(limpiarCompletados());
  }

}
