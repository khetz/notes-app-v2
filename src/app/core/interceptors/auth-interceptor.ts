import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  let noAuthRequired = req.url.toLowerCase().includes("login") 
                      || req.url.toLowerCase().includes("register")
                      || req.url.toLowerCase().includes("logout");

  if (noAuthRequired)
    return next(req);

  const authToken = authService.getAccessToken();
  const authorizedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return next(authorizedRequest);
};
