import { Component, OnInit } from '@angular/core';
import { TodoFacadeService } from '../../facades/todo.facade';
import { map, Observable } from 'rxjs';
import { TodoView } from '../../models/todo-view.model';
import { MatSelectChange } from '@angular/material/select';

enum SortOptions {
  CompletedFirst = 'Completed First',
  InProgressFirst = 'In Progress First',
  AlphabeticalAZ = 'A-Z',
  AlphabeticalZA = 'Z-A',
}

enum FilterOptions {
  Completed = 'Completed',
  Progress = 'In Progress',
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  public readonly todos$ = this._todoFacadeService.todos$;
  public filteredAndSortedTodos$: Observable<TodoView[]> = this.todos$;

  private filterValue!: string;
  private sortValue!: string;

  constructor(private readonly _todoFacadeService: TodoFacadeService) {}

  get sortOptions(): SortOptions[] {
    return Object.values(SortOptions);
  }

  get filterOption(): FilterOptions[] {
    return Object.values(FilterOptions);
  }

  public ngOnInit(): void {
    this._todoFacadeService.loadUserTodos();
  }

  public onFilterChange({ value }: MatSelectChange, type: 'filter' | 'sort') {
    switch (type) {
      case 'filter':
        this.filterValue = value;
        break;
      case 'sort':
        this.sortValue = value;
        break;
      default:
        break;
    }

    this.applyFilterAndSort();
  }

  private applyFilterAndSort() {
    this.filteredAndSortedTodos$ = this.todos$.pipe(
      map((todos) => {
        let filtered = [...todos];

        // Apply filtering
        if (this.filterValue) {
          filtered = filtered.filter((todo) => {
            switch (this.filterValue) {
              case FilterOptions.Completed:
                return todo.isCompleted;
              case FilterOptions.Progress:
                return !todo.isCompleted;
              default:
                return true;
            }
          });
        }
        // Apply sorting
        if (this.sortValue) {
          filtered = filtered.sort((a, b) => {
            switch (this.sortValue) {
              case SortOptions.CompletedFirst:
                return Number(b.isCompleted) - Number(a.isCompleted);
              case SortOptions.InProgressFirst:
                return Number(a.isCompleted) - Number(b.isCompleted);
              case SortOptions.AlphabeticalAZ:
                return a.title.localeCompare(b.title);
              case SortOptions.AlphabeticalZA:
                return b.title.localeCompare(a.title);
              default:
                return 0;
            }
          });
        }

        return filtered;
      })
    );
  }
}
