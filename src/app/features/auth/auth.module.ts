import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { AuthFacadeService } from './facades/auth.facade';
import { AuthApiService } from './services/auth-api.service';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [MaterialModule, ReactiveFormsModule],
  exports: [],
  providers: [AuthFacadeService, AuthApiService],
})
export class AuthModule {}
