import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../Service/login_service/loginservice.service';
import { Router } from '@angular/router';

interface LoginResponse {
  username: string;
  role: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  onLogin() {
    const { username, password } = this.loginForm.value;

    this.loginService.login(username, password).subscribe({
      next: (res: any) => {
        if (res) {
          alert('Đăng nhập thành công!');
          console.log('Kết quả:', res);
          localStorage.setItem('userRole', res.role);
          console.log(localStorage.getItem('userRole'));
          this.router.navigate(['/product']);
        } else {
          alert('Sai tài khoản hoặc mật khẩu!');
        }
      },
      error: (err) => {
        console.error(err);
        alert('Đăng nhập thất bại!');
      }
    });
  }
}
