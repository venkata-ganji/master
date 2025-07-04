import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { User, LoginRequest, RegisterRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.checkStoredAuth();
  }

  private checkStoredAuth(): void {
    const token = localStorage.getItem('truecredit_token');
    const userData = localStorage.getItem('truecredit_user');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
      } catch (error) {
        this.logout();
      }
    }
  }

  login(credentials: LoginRequest): Observable<any> {
    return this.apiService.login(credentials).pipe(
      tap(response => {
        if (response.token && response.user) {
          localStorage.setItem('truecredit_token', response.token);
          localStorage.setItem('truecredit_user', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  register(userData: RegisterRequest): Observable<any> {
    return this.apiService.register(userData).pipe(
      tap(response => {
        if (response.token && response.user) {
          localStorage.setItem('truecredit_token', response.token);
          localStorage.setItem('truecredit_user', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('truecredit_token');
    localStorage.removeItem('truecredit_user');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/splash']);
  }

  updateUserPoints(newPoints: number): void {
    const currentUser = this.currentUserSubject.value;
    if (currentUser) {
      const updatedUser = { ...currentUser, truePoints: newPoints };
      localStorage.setItem('truecredit_user', JSON.stringify(updatedUser));
      this.currentUserSubject.next(updatedUser);
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getCurrentUserId(): string | null {
    const user = this.getCurrentUser();
    return user ? user.id : null;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('truecredit_token');
  }
}