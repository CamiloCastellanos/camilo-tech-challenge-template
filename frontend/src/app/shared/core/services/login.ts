import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LoginRequest } from '../../../models/login-request';
import { Response } from '../../../models/response';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private readonly http: HttpClient) { }

  async login(email: string, password: string) {
    const user: LoginRequest = {
      user: email,
      password: password
    }
    return await firstValueFrom(this.http.post('https://localhost:44368/api/User/Login', user)).then(
      (resp) => {
        return resp as Response
      }
    );
  }
}
