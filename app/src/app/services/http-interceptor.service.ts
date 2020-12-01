import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { RootActions, RootState } from '@app/stores';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private store: Store<RootState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // req = req.clone({
    //   withCredentials: true,
    // });

    return next.handle(req).pipe(
      catchError((error) => {
        this.store.dispatch(RootActions.setError({ error }));
        return throwError(error);
      })
    );
  }
}
