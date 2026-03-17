import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const tokenRefreshInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status == 401) {
          authService.refreshToken().subscribe({
            next: (res) => {
              authService.setAccessToken(res.accessToken);
            }
          })
      }

      return throwError(() => error);
    })
  );
};
