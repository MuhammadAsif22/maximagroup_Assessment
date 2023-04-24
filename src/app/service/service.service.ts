import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Service {
  readonly apiUrl = 'https://localhost:44371/api/';
  readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private httpClient: HttpClient) {}

  GetUserData(): Observable<any> {
    let token = localStorage.getItem('token');
    if (token != null) {
      token = JSON.parse(token);
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<any>(this.apiUrl + 'home/', {
      headers: headers,
    });
  }

  Login(item: any): Observable<any> {
    return this.httpClient.post<any>(
      this.apiUrl + 'Account/Login',
      JSON.stringify(item),
      this.httpOptions
    );
  }
}
