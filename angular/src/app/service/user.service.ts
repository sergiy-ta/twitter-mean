import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  public async create(user): Promise<void> {
    const promise = this.http.post<{token: string}>('/api/user', user).toPromise();
    promise.catch(error => {
      if (error.status === 401) alert("Пароль або логін не вірний");
    });
    const token: string = await (await promise).token;
    if (token) {
      localStorage.setItem('token', token);
      this.router.navigate(['main']);
    }
  }
}
