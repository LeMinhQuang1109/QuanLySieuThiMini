import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  [x: string]: any;
  private apiUrl = 'http://localhost:8089/api/login/authenticate';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post(this.apiUrl, null, { params });
  }
}
