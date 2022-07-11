import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { SignUpRequest } from '../models/sing-up-request';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _prefix = 'api/auth/';

  constructor(private httpService: HttpService) { }

  test(): Observable<void> {
    return this.httpService.get<void>(`${this._prefix}test`);
  }

  signUp(request: SignUpRequest): Observable<Token> {
    return this.httpService.post(`${this._prefix}sign-up`, request);
  }

  signIn(request: SignUpRequest): Observable<Token> {
    return this.httpService.get<Token>(`${this._prefix}sign-in?${this.httpService.getQueryString(request)}`);
  }
}
