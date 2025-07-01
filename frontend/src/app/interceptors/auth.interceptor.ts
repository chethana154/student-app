import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();

  if (token) {
    const modified = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(modified);
  }

  return next(req);
};
