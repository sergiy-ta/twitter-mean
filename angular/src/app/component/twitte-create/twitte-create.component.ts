import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TwitteService } from '../../service/twitte.service';

@Component({
  selector: 'app-twitte-create',
  templateUrl: './twitte-create.component.html',
  styleUrls: ['./twitte-create.component.scss']
})
export class TwitteCreateComponent implements OnInit {
  private twitteService: TwitteService;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'text': [null, Validators.required]
    });
  }

  send(twitte): void {
    this.form.disable();
    this.twitteService.create(twitte);
  }
}
