import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { editar, eliminar, toggle } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @ViewChild('inputFisico') txtInputFisico!: ElementRef;

  @Input() todo!: Todo;

  chkCompletado!: FormControl;
  txtInput!: FormControl;

  editando: boolean = false;

  

  editar(){
    this.editando = true;
    this.txtInput.setValue(this.todo.texto);
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  terminarEdicion(){
    this.editando = false;

    if(this.txtInput.invalid){
      return;
    }

    this.store.dispatch(editar({id: this.todo.id, texto: this.txtInput.value}))
  }

  eliminar(){
    this.store.dispatch(eliminar({id:this.todo.id}))
  }

  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    this.chkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, [Validators.required]);

    this.chkCompletado.valueChanges.subscribe(value =>{
      this.store.dispatch(toggle({id: this.todo.id}))
    })
  }

}
