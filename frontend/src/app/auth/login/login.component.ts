import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService, LoginResponse } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = { email: '', password: '' }; 
  isLoading = false;           
  errorMessage = '';          

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.isLoading = true;
    this.errorMessage = '';
  
    this.auth.login(this.user).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.auth.storeToken(res.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Login failed';
      }
    });
  }
}
