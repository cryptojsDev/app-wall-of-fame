import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  username: string;
  email: string;
  avatar?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Check if there's a stored user
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(username: string, password: string): Observable<User> {
    // Simular una llamada a la API
    return of({
      username: username,
      email: `${username}@example.com`
    }).pipe(
      tap(user => {
        // Guardar usuario en localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  loginWithGoogle(): boolean {
    // Mock Google login
    const mockUser: User = {
      username: 'GoogleUser',
      email: 'google.user@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=google'
    };
    
    this.currentUserSubject.next(mockUser);
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    return true;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
} 