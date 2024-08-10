import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TodoFacadeService } from 'src/app/features/todo/facades/todo.facade';
import { TodoView } from 'src/app/features/todo/models/todo-view.model';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
})
export class TodoCardComponent implements OnInit {
  @Input() todo!: TodoView;

  public editMode = false;

  public readonly todoForm = this._fb.group({
    title: this._fb.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    isCompleted: this._fb.control(false, {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _todoFacadeService: TodoFacadeService
  ) {}

  get completionText(): string {
    return this.todoForm.get('isCompleted')?.value
      ? 'Completed'
      : 'Mark as Complete';
  }

  public ngOnInit(): void {
    this.todoForm.patchValue(this.todo);
  }

  public toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  public onTodoDelete(): void {
    this._todoFacadeService.deleteTodo(this.todo?.id);
  }
}
