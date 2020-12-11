import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TweetService } from '../../service/tweet.service';

@Component({
  selector: 'app-tweet-create',
  templateUrl: './tweet-create.component.html',
  styleUrls: ['./tweet-create.component.scss']
})
export class TweetCreateComponent implements OnInit {
  private tweetService: TweetService;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'text': [null, Validators.required]
    });
  }

  send(tweet): void {
    this.form.disable();
    this.tweetService.create(tweet);
  }
}
