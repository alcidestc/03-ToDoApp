import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { crear } from '../todo.actions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {

  txtinput!: FormControl;

  constructor(private store: Store<AppState>) { 
    this.txtinput = new FormControl('', [Validators.required, Validators.minLength(1)]);
  }

  ngOnInit(): void {
  }

  agregar(){
    if(this.txtinput.invalid){
      return ;
    }    
    this.store.dispatch(crear({texto: this.txtinput.value}))
    this.txtinput.reset();
  }

}
