import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let noAuthRequired = req.url.toLowerCase().includes("login") 
                      || req.url.toLowerCase().includes("register")
                      || req.url.toLowerCase().includes("logout");

  if (noAuthRequired)
    return next(req);

  const authToken = '';
  const authorizedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return next(authorizedRequest);
};
