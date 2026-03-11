import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { User } from './models/user';
import { authGuard } from './shared/guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', component: Home, canActivate: [authGuard] },
  { path: 'user', component: User, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
