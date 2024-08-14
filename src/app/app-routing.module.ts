import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { TodoListComponent } from './features/todo/pages/todo-list/todo-list.component';
import { authGuard } from './shared/guards/auth.guard';
import { redirectGuard } from './shared/guards/redirect.guard';
import { RegisterComponent } from './features/auth/pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    canActivate: [redirectGuard],
    path: 'login',
    component: LoginComponent,
  },
  {
    canActivate: [redirectGuard],
    path: 'register',
    component: RegisterComponent,
  },
  {
    canActivate: [authGuard],
    path: 'todos',
    component: TodoListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
