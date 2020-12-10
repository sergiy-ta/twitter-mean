import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  public async login(login): Promise<void> {
    const promise = this.http.post<{token: string, number: number}>('/api/login', login).toPromise();

    promise.catch(error => {
      console.log(error);
      if (error.status === 401) alert("Пароль або логін не вірний");
      if (error.status === 403) alert("Ви вичерпили свій ліміт проб на вхід, попробуйте через " + error.error.number + " хвилин");
    });

    const token: string = await (await promise).token;

    if (token) {
      localStorage.setItem('token', token);
      this.router.navigate(['main']);
    }
  }

  public async get(): Promise<User | null> {
    const promise = this.http.get<User| null>('/api/login').toPromise();
    promise.catch(error => {
      if (error.status === 401) this.router.navigate(['login']);
    });
    return await promise;
  }
}
