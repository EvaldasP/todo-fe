import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [MaterialModule, ReactiveFormsModule],
  exports: [],
  providers: [],
})
export class AuthModule {}
