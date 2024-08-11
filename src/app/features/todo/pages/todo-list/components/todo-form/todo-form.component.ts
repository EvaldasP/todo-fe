import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TodoFacadeService } from 'src/app/features/todo/facades/todo.facade';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent {
  public readonly todoForm = this._fb.group({
    title: this._fb.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _todoFacadeService: TodoFacadeService
  ) {}

  get isFormValid(): boolean {
    return this.todoForm.valid;
  }

  public onCreateTodo(): void {
    if (!this.isFormValid) {
      return;
    }

    const payload = this.todoForm.getRawValue();

    this._todoFacadeService.createTodo(payload);
    this.todoForm.reset();
  }
}
