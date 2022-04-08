import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginUserData = new User('', '');
  isLoading = false;
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(userForm) {
    console.log('Form submitted = ', this.loginUserData);
  }

  submitForm() {
    this.isLoading = true;
    setTimeout(() => {
      console.log('Form submitted = ', this.loginUserData);
      this.auth.loginUser(this.loginUserData).subscribe(
        (res) => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigateByUrl('/special');
          this.isLoading = false;
        },
        (err) => {
          console.log(err);
          this.errorMsg = err.error;
          this.isLoading = false;
        }
      );
    }, 3000);
  }
}
