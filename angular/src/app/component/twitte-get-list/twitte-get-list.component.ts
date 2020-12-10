import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-twitte-get-list',
  templateUrl: './twitte-get-list.component.html',
  styleUrls: ['./twitte-get-list.component.scss']
})
export class TwitteGetListComponent implements OnInit {
  user: { first_name: string, last_name: string } = {
    first_name: "",
    last_name: ""
  }
  text: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
