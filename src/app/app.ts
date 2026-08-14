import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-todo');

  todoList: string[] = [];

  addTodo(value: string) {
    if(value.trim()) {
      this.todoList.push(value)
    }
  }

}
