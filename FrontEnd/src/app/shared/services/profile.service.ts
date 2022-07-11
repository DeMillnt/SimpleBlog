import { Injectable } from '@angular/core';
import { Token } from 'src/app/auth/models/token';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  get userName(): string {
    return localStorage?.getItem('userName') ?? '';
  }

  get userId(): string {
    return localStorage?.getItem('userId') ?? '';
  }

  get tokenString(): string {
    return localStorage?.getItem('token') ?? '';
  }
  set token(value: Token) {
    localStorage.setItem('token', value.token);
    localStorage.setItem('userName', value.userName);
    localStorage.setItem('userId', value.userId);
  }

  get isAuthorized(): boolean {
    return !!this.tokenString;
  }

  constructor() { }

  logout(): void {
    localStorage.clear();
    window.location.reload();
  }
}
