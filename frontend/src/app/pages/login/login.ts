import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../shared/core/services/login';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { SessionStorage } from '../../shared/core/services/session-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgbAlert],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  @ViewChild('errorAlert', { static: false }) staticAlert!: NgbAlert;
  errorAlertClosed = false;
  showAlert: boolean = false;
  public loginForm: FormGroup = new FormGroup({});

  constructor(private readonly fb: FormBuilder,
    private readonly loginService: LoginService,
    private readonly sessionStorage: SessionStorage,
    private readonly router: Router) {
    if (sessionStorage.isLoggedIn()) {
      this.redirectHome()
    }
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email], []],
      password: ['', [Validators.required], []],
    })
  }

  closeAlert() {
    this.showAlert = false;
  }

  async login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    let response = await this.loginService.login(this.loginForm.value.email, this.loginForm.value.password);
    if (response.data == null) {
      this.showAlert = true;
      this.loginForm.reset();
    }
    this.sessionStorage.saveUser(response.data);
    this.showAlert = false;
    this.redirectHome();
  }

  private redirectHome() {
    this.router.navigate(['/home']);

  }

}
