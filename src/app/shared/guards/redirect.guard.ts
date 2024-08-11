import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthFacadeService } from 'src/app/features/auth/facades/auth.facade';

export const redirectGuard: CanActivateFn = () => {
  const authFacadeService = inject(AuthFacadeService);
  const router = inject(Router);

  if (authFacadeService.isTokenValid) {
    router.navigate(['todos']);
    return false;
  } else {
    return true;
  }
};
