import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private loggedIn = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token')
  );
   isLoggedIn$ = this.loggedIn.asObservable();

  setLogin(token: string) {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
  }
  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['']);
  }
  private apiUrl= environment.apiUrl;
  constructor(private http: HttpClient, private router : Router){}
  insert_user(data:any): Observable<any> {
    return this.http.post<any[]>(this.apiUrl+'/users/user-insert', data);
  } 
  get_user(data:any): Observable<any> {
    return this.http.post<any[]>(this.apiUrl+'/users/user-login', data);
  }
  getUserId(): number | null {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const decoded: any = jwtDecode(token);
  return decoded.id;
}
}

