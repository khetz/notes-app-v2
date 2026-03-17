import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl = environment.apiUrl + 'auth/'
  http = inject(HttpClient);
  private accessToken: string | null = null;

  registerUser(filledRegistrationForm: Auth) {
    return this.http.post(`${this.authUrl}register`, filledRegistrationForm);
  }

  getAccessToken() {
    return this.accessToken;
  }

  setAccessToken(token: string) {
   this.accessToken = token; 
  }

  clearToken() {
    this.accessToken = null;
  }

  login(filledLoginForm: Auth) {
    return this.http.post(`${this.authUrl}login`, filledLoginForm);
  }
}
