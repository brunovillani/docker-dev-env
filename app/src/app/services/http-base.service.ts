import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '@env/environment';
import { ErrorBase } from '@app/models';

export interface HttpBaseParams {[key: string]: number | number[] | string | string[]};

export class BaseHttpService {
  private getHeader: HttpHeaders;
  constructor(
    private http: HttpClient,
    private serviceName: string = ''
  ) {
    this.getHeader = new HttpHeaders({
      'Content-type': 'application/json',
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      'Access-Control-Allow-Origin': '*',
      'withCredentials': 'true'
    });
  }

  //#region route formatting
  private getRoute(route: string | any[]): string {
    if (!Array.isArray(route)) {
      route = [route];
    }
    return environment.api_url + '/' + route.join('/');
  }

  private getHttpParams(parameters: HttpBaseParams): HttpParams {
    let params = new HttpParams();

    if (parameters) {
      Object.keys(parameters).forEach(key => {
        if (Array.isArray(parameters[key])) {
          (parameters[key] as []).forEach(p => {
            if (p != null) {
              params = params.append(key, this.getParamValue(p));
            }
          });
        } else if (parameters[key] != null) {
          params = params.append(key, this.getParamValue(parameters[key]));
        }
      });
    }

    return params;
  }

  private getParamValue(value: any) {
    return value.toString();
  }
  //#endregion

  //#region http verbs
  protected get<T>(route: string | any[], parameters: HttpBaseParams = null): Observable<T> {
    const httpParams = this.getHttpParams(parameters);
    const url = this.getRoute(route);

    return this.http
      .get(url, { params: httpParams, headers: this.getHeader, withCredentials: true })
      .pipe(
        map((data: any) => data),
        catchError(this.handleError(this.serviceName, 'get'))
      );
  }

  protected post<T>(route: string | any[], body: Object = null, parameters: HttpBaseParams = null): Observable<T> {
    const httpParams = this.getHttpParams(parameters);
    const url = this.getRoute(route);

    return this.http
      .post(url, body, { params: httpParams, headers: this.getHeader, withCredentials: true })
      .pipe(
        map((data: any) => data),
        catchError(this.handleError(this.serviceName, 'post'))
      );
  }

  protected put<T>(route: string | any[], body: Object = null, parameters: HttpBaseParams = null): Observable<T> {
    const httpParams = this.getHttpParams(parameters);
    const url = this.getRoute(route);   
    return this.http
      .put(url, body, { params: httpParams, headers: this.getHeader, withCredentials: true })
      .pipe(
        map((data: any) => data),
        catchError(this.handleError(this.serviceName, 'put'))
      );
  }

  protected delete<T>(route: string | any[], parameters: HttpBaseParams = null): Observable<T> {
    const httpParams = this.getHttpParams(parameters);
    const url = this.getRoute(route);

    return this.http
      .delete(url, { params: httpParams, headers: this.getHeader, withCredentials: true })
      .pipe(
        map((data: any) => data),
        catchError(this.handleError(this.serviceName, 'delete'))
      );
  }

  protected patch<T>(route: string | any[], parameters: HttpBaseParams = null): Observable<T> {
    const httpParams = this.getHttpParams(parameters);
    const url = this.getRoute(route);

    return this.http
      .patch(url, { params: httpParams })
      .pipe(
        map((data: any) => data),
        catchError(this.handleError(this.serviceName, 'patch'))
      );
  }

  protected upload<T>(route: string | any[], body: Object = null, parameters: HttpBaseParams = null, httpMethod: string = 'POST') {
    const httpParams = this.getHttpParams(parameters);
    const url = this.getRoute(route);

    const request = new HttpRequest(httpMethod, url, body, {
      reportProgress: true,
      params: httpParams
    });
    return this.http.request(request)
      .pipe(
        map((data: any) => data),
        catchError(this.handleError(this.serviceName, 'upload'))
      );
  }
  //#endregion

  //#region exception

  private handleError<T>(serviceName = '', operation = '') {
    return (e: HttpErrorResponse): Observable<T> => {
      const error = new ErrorBase({
        type: 'http-request',
        innerError: e,
        message: `error raised from ${serviceName} on a ${operation} operation`
      });
      return throwError(error);
    };
  }
  //#endregion
}
