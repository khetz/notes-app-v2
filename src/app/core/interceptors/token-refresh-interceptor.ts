import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';


export const tokenRefreshInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const routerService = inject(Router);

  if (req.url.includes('/refresh')) {
    return next(req);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status == 401 && !authService.isRefreshing) {
        authService.isRefreshing = true;
        authService.refreshTokenSubject.next(null);

        return authService.refreshToken()
        .pipe(
          switchMap((res) => {
            authService.isRefreshing = false;

            authService.setAccessToken(res.accessToken);
            authService.refreshTokenSubject.next(res.accessToken);

            return next(addToken(req, res.accessToken));
          }),
          catchError(() => {
            authService.isRefreshing = false;
            authService.clearToken();
            routerService.navigateByUrl('/login');
            return throwError(() => error)
          })
        );
      }
      else if (error.status == 401) {
        return authService.refreshTokenSubject.pipe(
          filter(token => token !== null),
          take(1),
          switchMap(token => next(addToken(req, token!)))
        )
      }

      return throwError(() => error);
    })
  );
};

function addToken(request: HttpRequest<any>, token: string) {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    },
    withCredentials: true
  });
}
