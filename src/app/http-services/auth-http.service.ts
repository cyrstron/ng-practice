import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthHttpService {
  token: string;

  constructor(private httpClient: HttpClient) { }

  login(email, password) {
    return this.httpClient.post('/api/login', {
      email,
      password
    });
  }

  createNewUser(userData) {
    return this.httpClient.post('/api/users/create', userData);
  }

}
