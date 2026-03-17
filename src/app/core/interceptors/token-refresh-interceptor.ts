import { HttpEventType, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const tokenRefreshInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  return next(req).pipe(
    tap((event) => {
      if (event.type == HttpEventType.Response 
        && event.status == HttpStatusCode.Unauthorized) {
          authService.refreshToken().subscribe({
            next: (res) => {
              authService.setAccessToken(res.accessToken);
            }
          })
      }
    })
  );
};
