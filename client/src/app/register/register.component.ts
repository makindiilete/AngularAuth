import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerUserData = new User('', '');
  isLoading = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(userForm) {
    console.log('Form submitted = ', this.registerUserData);
  }

  submitForm() {
    this.isLoading = true;
    console.log('Form submitted = ', this.registerUserData);
    this.auth.registerUser(this.registerUserData).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/special');
      },
      (err) => console.log(err)
    );
    this.isLoading = false;
  }
}
