import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-todo');

  todoList: string[] = [];
  isClick = false;
  HoverIndex: number | null = null;

  addTodo(value: string) {
    if(value.trim()) {
      this.todoList.push(value)
    }
  }

  toggleCheck() {
    this.isClick = !this.isClick;
  }

}
