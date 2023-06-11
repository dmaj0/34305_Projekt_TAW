// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userData = { login: '', password: '' };

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.userData).subscribe(response => {
      console.log('Token:', response.token);
    });
  }
}
