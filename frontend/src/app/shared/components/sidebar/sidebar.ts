import { Component, OnInit, } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
//Boostrap
import { NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap';
//Fortawesome
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faGear, faUser, faHouse, faChartBar, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
//
import { User, UserType } from '../../../models/user';
import { SessionStorage } from '../../core/services/session-storage';
import { SidebarService } from '../../core/services/sidebar-service';
import { Menu } from '../../../models/menu';
import { AuthService } from '../../core/services/auth-service';

@Component({
  selector: 'sidebar',
  imports: [RouterOutlet, NgbOffcanvasModule, FontAwesomeModule, RouterLinkActive, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  standalone: true
})
export class Sidebar implements OnInit {
  collapsed = false;
  user: User = new User();
  userType: string = '';
  menu: Menu[] = [];
  constructor(private readonly sessionStorage: SessionStorage,
    private readonly library: FaIconLibrary,
    private readonly sidebarService: SidebarService,
    private readonly authService: AuthService
  ) {
    this.listIcon();
  }

  ngOnInit() {
    this.getUser();
    this.getMenu();
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed
  }

  logOut() {
    this.authService.logOut();
  }

  private listIcon() {
    this.library.addIcons(faUser, faGear, faHouse, faChevronLeft, faChartBar, faArrowRightFromBracket);
  }

  private getUser() {
    let user = this.sessionStorage.getUser() ?? '';
    this.user = user == '' ? new User() : JSON.parse(user) as User;
    this.userType = UserType[this.user.userType];
  }

  private async getMenu() {
    let response = await this.sidebarService.getMenu();
    if (response.statusCode != 200) {
      this.menu = [{ "id": 1, "text": "Home", "page": "/", "icon": "home" }]
      return;
    }

    if (Array.isArray(response.data)) {
      this.menu = response.data as Menu[];
    }
  }
}
