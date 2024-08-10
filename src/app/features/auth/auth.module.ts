import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { AuthFacadeService } from './facades/auth.facade';
import { AuthApiService } from './services/auth-api.service';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [MaterialModule, ReactiveFormsModule],
  exports: [],
  providers: [AuthFacadeService, AuthApiService],
})
export class AuthModule {}
