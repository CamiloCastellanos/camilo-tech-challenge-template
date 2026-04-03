import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
//Bootstrap
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
//FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
//hot-toast
import { HotToastService } from '@ngxpert/hot-toast';
//
import { User as UserModel, UserType } from '../../models/user'
import { UserService } from '../../shared/core/services/user-service';
import { Response } from '../../models/response';
import { AddUser } from './components/add-user/add-user';

@Component({
  selector: 'app-user',
  imports: [NgbPagination, FormsModule, AddUser, FontAwesomeModule],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User implements OnInit {
  private users: UserModel[] = [];
  userList: UserModel[] = [];
  page: number = 1;
  pageSize: number = 5;
  collectionSize: number = this.userList.length;
  isLoadData: boolean = false;
  faTrash = faTrash;

  constructor(private readonly userService: UserService, private toast: HotToastService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getUserType(userType: UserType): string {
    let user = UserType[userType];
    if (typeof user === "string") {
      return user
    }
    return UserType[user] ?? '';
  }

  refreshData() {
    this.userList = this.users.map((userList, i) => ({ index: i + 1, ...userList })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  }

  getAllUsers() {
    this.isLoadData = true;
    this.userService.getAllUsers().then((resp: Response) => {

      if (resp.statusCode != 200) {
        return;
      }

      if (Array.isArray(resp.data)) {
        this.users = resp.data as UserModel[];
        this.refreshData();
        this.collectionSize = this.users.length;
        this.isLoadData = false;
      }

    });
  }

  deleteUser(user: UserModel, index: number) {
    this.userService.deleteUser(user).then((resp: Response) => {
      if (resp.statusCode != 200) {
        this.toast.error(resp.message);
        return;
      }
      this.toast.success('User deleted successfully');
      this.users.splice(index, 1);
      this.collectionSize = this.users.length;
      this.refreshData();
    });
  }
}
