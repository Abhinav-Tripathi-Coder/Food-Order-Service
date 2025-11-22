import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { User, LoginLog } from '../models';
import { v4 as uuidv4 } from 'uuid';

const LS_KEY = 'fos_user';
const LS_LOGIN_LOG = 'fos_login_log';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user$ = new BehaviorSubject<User | null>(this.loadUser());
  user$ = this._user$.asObservable();

  constructor(private http: HttpClient) {}

  get token(): string | undefined {
    const user = this._user$.value;
    return user ? `Bearer-${user.id}` : undefined;
  }

  get currentUser(): User | null {
    return this._user$.value;
  }

  private loadUser(): User | null {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }

  private save(user: User | null) {
    if (user) {
      localStorage.setItem(LS_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LS_KEY);
    }
    this._user$.next(user);
  }

  login(username: string, password: string): Observable<User> {
    return this.http.get<User[]>(`/api/users?username=${username}`).pipe(
      map(users => {
        if (users.length === 0) {
          throw new Error('Invalid username or password');
        }
        
        const user = users[0];
        
        if (user.password !== password) {
          throw new Error('Invalid username or password');
        }

        const updatedUser = {
          ...user,
          lastLogin: new Date().toISOString()
        };
        
        this.http.patch(`/api/users/${user.id}`, { lastLogin: updatedUser.lastLogin }).subscribe();
        
        const loginLog: LoginLog = {
          id: uuidv4(),
          userId: user.id,
          username: user.username,
          loginTime: new Date().toISOString(),
          logoutTime: undefined
        };
        
        this.http.post('/api/loginLogs', loginLog).subscribe();
        localStorage.setItem(LS_LOGIN_LOG, loginLog.id);
        
        this.save(updatedUser);
        return updatedUser;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(() => new Error('Invalid username or password'));
      })
    );
  }

  logout() {
    const logId = localStorage.getItem(LS_LOGIN_LOG);
    if (logId) {
      this.http.patch(`/api/loginLogs/${logId}`, { 
        logoutTime: new Date().toISOString() 
      }).subscribe();
      localStorage.removeItem(LS_LOGIN_LOG);
    }
    this.save(null);
  }

  isLoggedIn(): boolean {
    return !!this._user$.value;
  }

  isAdmin(): boolean {
    return this._user$.value?.role === 'admin';
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    const newUser: User = {
      ...user,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    return this.http.post<User>('/api/users', newUser);
  }

  updateUser(id: string, updates: Partial<User>): Observable<User> {
    return this.http.patch<User>(`/api/users/${id}`, updates);
  }

  updateUserProfile(id: string, updates: Partial<User>): Observable<User> {
    return this.http.patch<User>(`/api/users/${id}`, updates).pipe(
      tap(updatedUser => {
        const currentUser = this._user$.value;
        if (currentUser && currentUser.id === id) {
          const newUser = { ...currentUser, ...updates };
          this.save(newUser);
        }
      })
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`/api/users/${id}`);
  }

  getLoginLogs(): Observable<LoginLog[]> {
    return this.http.get<LoginLog[]>('/api/loginLogs');
  }

  getActiveUsers(): Observable<LoginLog[]> {
    return this.http.get<LoginLog[]>('/api/loginLogs?logoutTime=null');
  }
}
