import { Component, EventEmitter, Output, TemplateRef, } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
//FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAt, faKey, faPlus, faShield, faUser } from '@fortawesome/free-solid-svg-icons';
//Bootstrap
import { NgbAlert, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
//hot-toast
import { HotToastService } from '@ngxpert/hot-toast';
//
import { User, UserType } from '../../../../models/user';
import { UserService } from '../../../../shared/core/services/user-service';


@Component({
  selector: 'add-user',
  imports: [FontAwesomeModule, ReactiveFormsModule, NgbAlert],
  templateUrl: './add-user.html',
  styleUrl: './add-user.scss',
})
export class AddUser {
  userForm: FormGroup = new FormGroup({});
  showAlert: boolean = false;
  faPlus = faPlus;
  faUser = faUser;
  faAt = faAt;
  faKey = faKey;
  fileShield = faShield;
  userTypes = Object.entries(UserType)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({
      value: value,
      label: key
    }));
  private modalRef: NgbModalRef | null = null;
  @Output() refreshUserListEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(private readonly modalService: NgbModal,
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private toast: HotToastService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required], []],
      email: ['', [Validators.required, Validators.email], []],
      password: ['', [Validators.required], []],
      userType: ['', [Validators.required], []],
    })
  }

  open(content: TemplateRef<any>) {
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  async addUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    let newUser: User = {
      id: 0,
      name: this.userForm.value.name,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      userType: this.userForm.value.userType,
      image: ''
    };

    this.userService.AddUser(newUser).then((response) => {
      if (response.statusCode != 200) {
        this.toast.error(response.message);
        this.modalRef?.close('');
      }

      this.toast.success('User Created successfully');
      this.refreshUserListEvent.emit(true);
      this.modalRef?.close('');

    });

  }

  closeAlert() {
    this.showAlert = false;
  }
}
