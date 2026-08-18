import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

type Todo = {
  text: string;
  checked: boolean;
};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-todo');
  
  
  todoList: Todo[] = [];
  HoverIndex: number | null = null;

  addTodo(value: string) {
    if(value.trim()) {
      this.todoList.push({text: value, checked: false})
    }
  }
  
  toggleCheck(index: number): void {
    this.todoList[index].checked = !this.todoList[index].checked;
  }
  
  deleteTodo(index: number): void {
    this.todoList.splice(index, 1); // remove 1 item at index
  }
  
}