import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthFacadeService } from 'src/app/features/auth/facades/auth.facade';

export const authGuard: CanActivateFn = () => {
  const authFacadeService = inject(AuthFacadeService);

  if (authFacadeService.isLoggedIn) {
    return true;
  } else {
    authFacadeService.logout();
    return false;
  }
};
