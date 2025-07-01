import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';

  @Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
  })
  export class RegisterComponent {
    user = { name: '', email: '', course: '', status: '', password: '', role:'' };
    errorMessage = '';
    isLoading = false;
  
    constructor(private auth: AuthService, private router: Router) {}
  
    register() {
      this.isLoading = true;
      this.errorMessage = '';
  
      this.auth.register(this.user).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Registration failed';
        }
      });
    }
  }

