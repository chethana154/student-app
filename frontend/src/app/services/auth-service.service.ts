import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LoginResponse {
  token: string;
  email: string;
  _id: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  public isLoading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  register(user: any) {
    return  this.http.post(`${environment.apiUrl}/register`, user); 
   
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/login`, credentials);
  }

  getProfile() {
    return this.http.get(`${environment.apiUrl}/profile`);
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
