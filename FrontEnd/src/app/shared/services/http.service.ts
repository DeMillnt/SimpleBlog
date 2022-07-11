import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private _prefix = 'http://localhost:5000/';

  constructor(private profileSerive: ProfileService, private http: HttpClient) {

  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(this.getUrl(url), { headers: this.getHeaders() });
  }

  post<TResponse, TRequest>(url: string, body: TRequest): Observable<TResponse> {
    return this.http.post<TResponse>(this.getUrl(url), body, { headers: this.getHeaders() });
  }

  put<TResponse, TRequest>(url: string, body: TRequest): Observable<TResponse> {
    return this.http.put<TResponse>(this.getUrl(url), body, { headers: this.getHeaders() });
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.getUrl(url), { headers: this.getHeaders() });
  }

  getQueryString(obj: any, a: string = 'request'): string {

    let params = new HttpParams({ fromObject: obj });
    return params.toString();
  }

  private getUrl(url: string): string {
    return `${this._prefix}${url}`;
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'observe': 'response', 'responseType': 'json' });

    if (this.profileSerive.isAuthorized) {
      headers = headers.append('Authorization', `Bearer ${this.profileSerive.tokenString}`);
    }

    return headers;
  }
}
