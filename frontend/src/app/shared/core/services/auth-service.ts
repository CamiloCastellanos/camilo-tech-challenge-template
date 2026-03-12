import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionStorage } from './session-storage';
import { User } from '../../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedUserSubject = new BehaviorSubject<boolean>(false);
  loggedUser$: Observable<boolean> = this.loggedUserSubject.asObservable();
  constructor(private sessionStorage: SessionStorage) {
    this.verifyInitialSession();
  }

  private verifyInitialSession() {
    const isLogged = this.verifySession();
    this.loggedUserSubject.next(isLogged);
  }

  verifySession(): boolean {
    return this.sessionStorage.isLoggedIn();
  }

  setSesion(user: User) {
    this.sessionStorage.setUser(user);
    this.loggedUserSubject.next(true);
  }

  logOut() {
    this.sessionStorage.clear();
    this.loggedUserSubject.next(false);
  }

  getUser() {
    const user = this.sessionStorage.getUser();
    return user ? JSON.parse(user) as User : null;
  }
}
