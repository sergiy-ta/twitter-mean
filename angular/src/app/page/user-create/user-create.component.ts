import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'last_name': [null, Validators.required],
      'first_name': [null, Validators.required],
      'email': [null, Validators.email],
      'age': [null, Validators.required],
      'password': [null, Validators.required],
      'confirm_password': [null]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup): any {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirm_password').value;

    return pass === confirmPass ? null : { notSame: true }
  }

  create(user): void {
    this.userService.create(user);
  }
}
