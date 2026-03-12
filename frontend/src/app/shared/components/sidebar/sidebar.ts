import { Component, OnInit, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//Boostrap
import { NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap';
//Fortawesome
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faGear, faUser ,faHouse} from '@fortawesome/free-solid-svg-icons';
//
import { User, UserType } from '../../../models/user';
import { SessionStorage } from '../../core/services/session-storage';

@Component({
  selector: 'sidebar',
  imports: [RouterOutlet,NgbOffcanvasModule, FontAwesomeModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  standalone: true
})
export class Sidebar implements OnInit {
  collapsed = false;
  user: User = new User();
  userType: string = '';
  constructor(private readonly sessionStorage: SessionStorage,
    private readonly library: FaIconLibrary
  ) {
    this.listIcon();
  }

  ngOnInit() {
    this.getUser();
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed
  }

  private listIcon() {
    this.library.addIcons(faUser, faGear, faHouse, faChevronLeft);
  }

  private getUser() {
    let user = this.sessionStorage.getUser() ?? '';
    this.user = user == '' ? new User() : JSON.parse(user) as User;
    this.userType = UserType[this.user.userType];
  }
}
