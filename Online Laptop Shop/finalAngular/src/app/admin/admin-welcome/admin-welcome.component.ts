import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-admin-welcome',
  templateUrl: './admin-welcome.component.html',
  styleUrls: ['./admin-welcome.component.css']
})
export class AdminWelcomeComponent implements OnInit {

  cardTitle:string;
  username:string;
  now: Date = new Date();
  constructor() { }

  ngOnInit() {
    this.username = Cookie.get('username')
    this.cardTitle = 'Welcome, '+ this.username;
  }

}
