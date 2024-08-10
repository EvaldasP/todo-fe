import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TodoView } from 'src/app/features/todo/models/todo-view.model';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss'],
})
export class TodoCardComponent implements OnInit {
  @Input() todo!: TodoView;

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

  constructor(private readonly _fb: FormBuilder) {}

  public ngOnInit(): void {
    this.todoForm.patchValue(this.todo);
  }
}
