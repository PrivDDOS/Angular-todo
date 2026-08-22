import { Component, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

type Todo = {
  text: string;
  checked: boolean;
};

type FilterTodo = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-todo');
  
  
  todoList: Todo[] = [];
  currentFilter: FilterTodo = 'all';
  HoverIndex: number | null = null;

  addTodo(value: string) {
    if(value.trim()) {
      this.todoList.push({text: value, checked: false})
    }
  }
  
  deleteTodo(todo: Todo): void {
    const todoIndex = this.todoList.indexOf(todo);
    this.todoList.splice(todoIndex, 1);
  }

  // Filter All/Active/Completed function
  setFilter(filter: FilterTodo) {
    this.currentFilter = filter;
  }

  get filteredTodo(): Todo[] {
    if(this.currentFilter === 'active') {
      return this.todoList.filter(item => !item.checked)
    }

    if(this.currentFilter === 'completed') {
      return this.todoList.filter(item => item.checked)
    }

    return this.todoList
  }

}