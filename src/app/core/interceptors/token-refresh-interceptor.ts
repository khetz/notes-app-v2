import { HttpEventType, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { tap } from 'rxjs';

export const tokenRefreshInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap((event) => {
      if (event.type == HttpEventType.Response 
        && event.status == HttpStatusCode.Unauthorized) {
        // call token refresh function
      }
    })
  );
};
