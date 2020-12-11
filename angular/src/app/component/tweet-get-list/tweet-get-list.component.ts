import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tweet-get-list',
  templateUrl: './tweet-get-list.component.html',
  styleUrls: ['./tweet-get-list.component.scss']
})
export class TweetGetListComponent implements OnInit {
  user: { first_name: string, last_name: string } = {
    first_name: "",
    last_name: ""
  }
  text: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
