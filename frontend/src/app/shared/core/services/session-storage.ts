import { Injectable } from '@angular/core';
import { User, UserType } from '../../../models/user';

@Injectable({
  providedIn: 'root',
})
export class SessionStorage {
  clear() {
    sessionStorage.clear()
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('user');
  }

  setUser(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return sessionStorage.getItem('user');
  }

}
