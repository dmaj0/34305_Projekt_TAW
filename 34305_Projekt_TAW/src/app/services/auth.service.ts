// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/user/auth';
  private API_URL_REGISTER = 'http://localhost:3000/api/user/create';

  constructor(private http: HttpClient) { }

  login(userData: any) {
    return this.http.post<any>(this.apiUrl, userData);
  }
  register(userData: any): Observable<any> {
    return this.http.post<any>(this.API_URL_REGISTER, userData);
  }
}
