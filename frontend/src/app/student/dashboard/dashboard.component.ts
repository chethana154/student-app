import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common'; 

// 💡 Optional: define a Student interface for cleaner typing
interface Student {
  name: string;
  email: string;
  course: string;
  status: string;
  role: string;
  _id: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  student: Student | null = null;
  students: Student[] = [];
  isLoading = true;
  role = '';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.role = this.auth.getRole();
    this.isLoading = true;

    this.auth.getProfile().subscribe({
      next: (res: any) => {
        this.isLoading = false;

        if (this.role === 'admin') {
          this.students = res as Student[];
        } else {
          this.student = res as Student;
        }
      },
      error: () => {
        this.isLoading = false;
        this.router.navigate(['/login']);
      }
    });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
