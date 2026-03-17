import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const tokenRefreshInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const routerService = inject(Router);
  let isRefreshing = false;

  if (req.url.includes('/refresh')) {
    isRefreshing = true;
    return next(req);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status == 401 && !isRefreshing) {
        authService.refreshToken().subscribe({
          next: (res) => {
            authService.setAccessToken(res.accessToken);

            const authorizedRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.accessToken}`
              }
            });

            return next(authorizedRequest);
          },
          error: (err) => {
              authService.clearToken();
              routerService.navigateByUrl('/login');
          },
          complete: () => {
            isRefreshing = false;
          }
        })
      }

      return throwError(() => error);
    })
  );
};
