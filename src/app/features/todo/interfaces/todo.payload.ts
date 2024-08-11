import { TodoView } from '../models/todo-view.model';

export type TodoPayload = Pick<TodoView, 'title'>;
