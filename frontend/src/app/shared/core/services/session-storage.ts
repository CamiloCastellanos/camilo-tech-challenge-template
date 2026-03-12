import { Injectable } from '@angular/core';
import { User, UserType } from '../../../models/user';

@Injectable({
  providedIn: 'root',
})
export class SessionStorage {
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('user');
  }

  saveUser(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return sessionStorage.getItem('user');
  }

}
