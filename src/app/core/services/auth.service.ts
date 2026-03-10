import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl = environment.apiUrl + 'auth/'
  http = inject(HttpClient);

  registerUser(filledRegistrationForm: Registration) {
    return this.http.post(`${this.authUrl}register`, filledRegistrationForm)
  }
}
