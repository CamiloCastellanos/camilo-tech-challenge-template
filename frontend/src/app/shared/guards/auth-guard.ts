import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionStorage } from '../core/services/session-storage';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(SessionStorage);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
