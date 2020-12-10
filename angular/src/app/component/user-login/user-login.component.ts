import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interface/user';

import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  first_name: string = "";
  last_name: string = "";

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  private async getUser(): Promise<void> {
    const user: User | null = await this.loginService.get();
    this.first_name = user.first_name;
    this.last_name = user.last_name;
  }

}
