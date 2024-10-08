import { Component, Input, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
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
    }),
  });

  constructor(
    private readonly _fb: NonNullableFormBuilder,
    private readonly _todoFacadeService: TodoFacadeService
  ) {}

  get isFormValid(): boolean {
    return this.todoForm?.valid;
  }

  get completionText(): string {
    return this.todo.isCompleted ? 'Completed' : 'Mark as Complete';
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

  public onStatusChange({ checked }: MatCheckboxChange): void {
    this._todoFacadeService.updateTodoStatus(this.todo?.id, checked);
  }

  public onTodoUpdate(): void {
    if (!this.isFormValid) {
      return;
    }

    const payload = this.todoForm.getRawValue();

    this._todoFacadeService.updateTodo(this.todo.id, payload);
  }
}
