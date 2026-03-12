import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//
import { Sidebar } from '../sidebar/sidebar';
import { AuthService } from '../../core/services/auth-service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'main-layout',
  imports: [RouterOutlet, Sidebar, AsyncPipe],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  loggedUser$: Observable<boolean>;
  constructor(readonly authService: AuthService) {
    this.loggedUser$ = authService.loggedUser$;
    console.log(this.loggedUser$)
  }
}
