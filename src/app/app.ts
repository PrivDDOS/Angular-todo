import { Component, afterNextRender, ChangeDetectorRef ,signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';

type Todo = {
  text: string;
  checked: boolean;
};

type FilterTodo = 'all' | 'active' | 'completed';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgClass, CdkDrag, CdkDropList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-todo');

  isDark: boolean = false;
  
  todoList: Todo[] = [];
  currentFilter: FilterTodo = 'all';
  HoverIndex: number | null = null;

  // Toggle light/dark mode
  switchMode() {
    this.isDark = !this.isDark
  }

  addTodo(value: string) {
    if(value.trim()) {
      this.todoList.push({text: value, checked: false})

      this.saveTodos()
    }
  }

  // localStorage
  constructor(private cdr: ChangeDetectorRef) {
    afterNextRender(() => {
      this.loadTodos();
      this.cdr.detectChanges();
    });
  }


  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todoList))
  }

  loadTodos() {
    const localSaved = localStorage.getItem('todos');

    if(localSaved) {
      this.todoList = JSON.parse(localSaved)
    }

  }

  // function for Todolist
  toggleCheck(todo: Todo): void {
    const todoIndex = this.todoList.indexOf(todo);

    if (todoIndex !== -1) {
      this.todoList[todoIndex].checked = !this.todoList[todoIndex].checked;
      this.saveTodos();
    }
  }

  deleteTodo(todo: Todo): void {
    const todoIndex = this.todoList.indexOf(todo);

    if (todoIndex !== -1) {
      this.todoList.splice(todoIndex, 1);
      this.saveTodos();
    }
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

  // Clear todo 
  clearTodo() {
    this.todoList = [];
    this.saveTodos();
  }

  // Drag and drop
  dragAndDrop(event: CdkDragDrop<Todo[]>) {
    moveItemInArray(this.todoList, event.previousIndex, event.currentIndex)
  }


}