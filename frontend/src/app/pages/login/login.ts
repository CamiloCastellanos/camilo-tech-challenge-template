import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../shared/core/services/login';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/core/services/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgbAlert],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  errorAlertClosed = false;
  showAlert: boolean = false;
  loginForm: FormGroup = new FormGroup({});

  constructor(private readonly fb: FormBuilder,
    private readonly loginService: LoginService,
    private readonly authService: AuthService,
    private readonly router: Router) {
    if (authService.verifySession()) {
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
      return;
    }
    if (response.data && !Array.isArray(response.data) && typeof response.data != 'boolean') {
      this.authService.setSesion(response.data);
    }
    this.showAlert = false;
    this.redirectHome();
  }

  private redirectHome() {
    this.router.navigate(['/home']);
  }

}
