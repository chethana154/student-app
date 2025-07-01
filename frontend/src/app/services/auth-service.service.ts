import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface LoginResponse {
  token: string;
  email: string;
  _id: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:5001/api/auth';
  public isLoading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  register(user: any) {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials);
  }

  getProfile() {
    return this.http.get(`${this.baseUrl}/profile`);
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
    const payload = JSON.parse(atob(token.split('.')[1]));
    localStorage.setItem('role', payload.role);
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
