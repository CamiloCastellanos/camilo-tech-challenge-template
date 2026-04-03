import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
//
import { Response } from '../../../models/response';
import { User } from '../../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) { }

  async getAllUsers() {
    return await firstValueFrom(this.http.get('https://localhost:44368/api/User/GetAllUsers')).then(
      (resp) => {
        return resp as Response
      }
    );
  }

  async AddUser(newUser: User) {
    newUser.image = `https://api.dicebear.com/9.x/miniavs/svg?seed=${newUser.name.replaceAll(' ', '').trim()}&backgroundColor=ffffff`;
    return await firstValueFrom(this.http.post('https://localhost:44368/api/User/AddUser', newUser)).then(
      (resp) => {
        return resp as Response
      }
    );
  }

  async deleteUser(user: User) {
    return await firstValueFrom(this.http.post('https://localhost:44368/api/User/DeleteUser', user)).then(
      (resp) => {
        return resp as Response
      }
    );
  }
}
