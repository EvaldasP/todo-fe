import { Component } from '@angular/core';
import { AuthFacadeService } from './features/auth/facades/auth.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public readonly isLoggedIn$ = this._authFacadeService.isLoggedIn$;

  constructor(private readonly _authFacadeService: AuthFacadeService) {}

  public onLogout(): void {
    this._authFacadeService.logout();
  }
}
