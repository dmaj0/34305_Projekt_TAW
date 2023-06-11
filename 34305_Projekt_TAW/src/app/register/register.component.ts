import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userData = { email: '', name: '', password: '' };
  registrationSuccessful = false;

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.register(this.userData).subscribe(response => {
      console.log('Registration response:', response);
      this.registrationSuccessful = true;
    });
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}