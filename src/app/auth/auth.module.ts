import { NgModule } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthFacadeService } from './facades/auth.facade';
import { AuthApiService } from './services/auth-api.service';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [LoginComponent],
  imports: [MaterialModule, ReactiveFormsModule],
  exports: [],
  providers: [AuthFacadeService, AuthApiService],
})
export class AuthModule {}
